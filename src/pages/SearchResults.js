import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../utils/api";
import moment from "moment";
import styled from "styled-components/macro";
import Loading from "react-loading-bar";

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
          {results.map((result, index) => (
            <ul key={index}>
              <li>
                <a href={result.url}>{result.title}</a>{" "}
                <button
                  value={result}
                  /* id={index} */
                  onClick={() => this.handleSaveItem(result)}
                >
                  Save
                </button>
              </li>
            </ul>
          ))}
          <Loading show={this.state.show} color="red" />
        </SearchResultsContainerInner>
      </SearchResultsContainer>
    );
  }
}

export default SearchResults;
