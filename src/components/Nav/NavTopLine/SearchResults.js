import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../../../utils/api";

class SearchResults extends React.Component {
  state = {
    results: []
  };

  getData = async () => {
    console.log(this.props.location.search);

    let query = queryString.parse(this.props.location.search);
    console.log(query); // {searchTerm: "apples"} after filter is {searchTerm: "apples", sources: "bbc-news"}

    this.setState({ loading: true });
    const news = await getSearchNews(query.searchTerm, query.sources);
    console.log(news);

    this.setState({ loading: false, results: news.data.articles });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
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
