import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../../utils/api";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "../../components/Card";
import NoSearchResults from "../../components/NoSearchResults";
import { LoadingConsumer } from "../../loadingContext";

const SearchResultsContainer = styled.div`
  width: 100vw;
`;

const SearchResultsContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  padding: 10px;
`;

export class SearchResults extends React.Component {
  state = {
    results: []
  };

  getData = async () => {
    try {
      let query = queryString.parse(this.props.location.search);
      this.props.setLoadingValue(true);
      if (!query.searchTerm) {
        this.props.setLoadingValue(false);
      }
      // if (!query.searchTerm) return;
      const news = await getSearchNews(query.searchTerm, query.sources);
      console.log(news);
      this.setState({
        results: news.data.articles
      });
      this.props.setLoadingValue(false);
    } catch (err) {
      console.log(err.message);
      this.setState({ error: true });
      this.props.setLoadingValue(false);
    }
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    //Used here because want something to happen after the state is updated?
    if (prevProps.location.search !== this.props.location.search) {
      this.getData();
    }
  }

  handleSaveItem = (result) => {
    const savedResult = {
      ...result,
      savedAt: moment().format("YYYY-MM-DD")
      // savedAt: "2019-08-15"
    };

    let newsArr = [];

    if (!localStorage.getItem("savedNews")) {
      newsArr.push(savedResult);
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
    } else if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));

      let alreadyInArr = newsArr.some((newsItem) => {
        return newsItem.title === savedResult.title;
      });
      if (alreadyInArr) {
        return alert("item already saved");
      }

      newsArr.push(savedResult);
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
    }
  };

  render() {
    const { results, loading } = this.state;

    let query = queryString.parse(this.props.location.search);
    if (!query.searchTerm) return null;
    if (results.length) {
      return (
        <SearchResultsContainer>
          <SearchResultsContainerInner>
            {results.map((result) => (
              <CardContainer key={result.url}>
                <Card
                  data={result}
                  text="Save"
                  handleClick={this.handleSaveItem}
                  extended
                  showSource
                />
              </CardContainer>
            ))}
          </SearchResultsContainerInner>
        </SearchResultsContainer>
      );
    }

    if (!results.length && !loading) return <NoSearchResults />;
    return "";
  }
}

// Changed for testing may revert back
// export default (props) => (
//   <LoadingConsumer>
//     {(values) => {
//       {
//         /* console.log(values); */
//       }
//       return <SearchResults {...values} {...props} />;
//     }}
//   </LoadingConsumer>
// );

const WithConsumer = (props) => (
  <LoadingConsumer>
    {(values) => {
      return <SearchResults {...values} {...props} />;
    }}
  </LoadingConsumer>
);

export default WithConsumer;
