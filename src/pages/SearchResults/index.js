import React from "react";
import queryString from "query-string";
import styled from "styled-components/macro";
import moment from "moment";
import { getSearchNews } from "../../utils/api";
import Card from "../../components/Card";
import { withConsumer } from "../../loadingContext";

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
        return this.props.setLoadingValue(false);
      }
      const news = await getSearchNews(query.searchTerm, query.sources);
      this.setState({
        results: news.data.articles
      });
      this.props.setLoadingValue(false);
    } catch (err) {
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
      savedAt: moment().format("YYYY-MM-DD") // format: "2019-08-15"
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
      if (!alreadyInArr) {
        newsArr.push(savedResult);
        localStorage.setItem("savedNews", JSON.stringify(newsArr));
      } else {
        // return alert("item already saved");
        console.log("already in arr");
      }
    }
  };

  render() {
    const { results } = this.state;

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
}

export default withConsumer(SearchResults);
