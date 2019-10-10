import React from "react";
import queryString from "query-string";
import moment from "moment";
import styled from "styled-components/macro";
import Loading from "react-loading-bar";
import { getSearchNews } from "../utils/api";
// import Card from "./reusableComponents/Card";
import Card from "./reusableComponents/Card";

// ======== Styled Components ========
const SearchResultsContainer = styled.div`
  width: 100vw;
`;

const SearchResultsContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
// ===================================

class SearchResults extends React.Component {
  state = {
    results: [],
    show: false
    // resultsToSave: JSON.parse(localStorage.getItem("newArrList"))
    // isSaveClicked: false
  };

  getData = async () => {
    let query = queryString.parse(this.props.location.search);
    this.setState({ show: true });

    const news = await getSearchNews(query.searchTerm, query.sources);
    console.log(news);
    this.setState({ show: false, results: news.data.articles });
  };

  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    if (!query.searchTerm) return this.props.history.push(`/not-found`);
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

    if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));
    }
    newsArr.push(savedResult);
    localStorage.setItem("savedNews", JSON.stringify(newsArr));
  };

  render() {
    const { results } = this.state;

    return (
      <SearchResultsContainer>
        <SearchResultsContainerInner>
          <div>
            <ul>
              {results.map((result) => (
                <Card
                  key={result.title}
                  item={result.title}
                  handleAction={this.handleSaveItem}
                  text="Save"
                  author={result.author}
                  publishedAt={result.publishedAt}
                  extended
                />
              ))}
            </ul>
            <Loading show={this.state.show} color="red" />
          </div>
        </SearchResultsContainerInner>
      </SearchResultsContainer>
    );
  }
}

export default SearchResults;
