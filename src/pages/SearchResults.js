import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../utils/api";
// import NavFilterBar from "../components/Nav/NavFilterBar/NavFilterBar";
// import newsSources from "../newsSources";
// import axios from "axios";
// import axiosCancel from "axios-cancel";

class SearchResults extends React.Component {
  state = {
    results: []
  };

  getData = async () => {
    let query = queryString.parse(this.props.location.search);
    this.setState({ loading: true });
    const news = await getSearchNews(query.searchTerm, query.sources);
    console.log(news);
    this.setState({ loading: false, results: news.data.articles });
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

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.map((result, index) => (
          <ul key={index}>
            <li>
              <a href={result.url}>{result.title}</a>
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

export default SearchResults;
