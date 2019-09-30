import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../utils/api";
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

    // try {
    //   let query = queryString.parse(this.props.location.search);
    //   this.setState({ loading: true });
    //   const news = await getSearchNews(query.searchTerm, query.sources);
    //   console.log(news);
    //   this.setState({ loading: false, results: news.data.articles });
    // } catch (thrown) {
    //   if (axiosCancel.isCancel(thrown)) {
    //     console.log("request cancelled");
    //   } else {
    //     console.log("some other reason");
    //   }
    // }
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

  // componentWillUnmount() {
  //   axiosCancel(getSearchNews());
  // }

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
