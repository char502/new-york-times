import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../utils/api";
import moment from "moment";
import styled from "styled-components/macro";
import Loading from "react-loading-bar";
import Card from "../components/Card";

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

    if (!localStorage.getItem("savedNews")) {
      newsArr.push(savedResult);
      alert("Item added to Local Storage");
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
      alert("Unique Item added to Local Storage ");
    }
  };

  render() {
    const { results } = this.state;

    return (
      <SearchResultsContainer>
        <SearchResultsContainerInner>
          <ul>
            {results.map((result) => (
              <Card
                key={result.title}
                data={result}
                text="Save"
                handleClick={this.handleSaveItem}
                extended
              />
            ))}
          </ul>
          <Loading show={this.state.show} color="red" />
        </SearchResultsContainerInner>
      </SearchResultsContainer>
    );
  }
}

export default SearchResults;
