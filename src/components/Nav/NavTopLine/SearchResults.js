import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../../../utils/api";

// import FilterBySource from "../NavFilterBar/FilterBySource";

class SearchResults extends React.Component {
  state = {
    results: []
  };

  getData = async () => {
    // if (!this.props.location.search) {

    // }
    console.log(this.props.location.search);

    let query = queryString.parse(this.props.location.search);
    console.log(query); // {searchTerm: "dials"}

    this.setState({ loading: true });
    const news = await getSearchNews(query.searchTerm, query.sources);
    console.log(news);

    // https://newsapi.org/v2/everything?q=apples&apiKey=174fa93fc630400bb21846743dcc5f64
    // https://newsapi.org/v2/everything?q=grapes&sources=mashable&apiKey=174fa93fc630400bb21846743dcc5f64

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

  // async componentDidUpdate(prevProps) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     let filteredQuery = queryString.parse(this.props.location.search);
  //     console.log(filteredQuery);
  //     this.setState({ loading: true });
  //     const news = await getSearchNews(query.searchTerm);
  //     console.log(news);
  //     this.setState({ loading: false, filteredResults: news.data.articles });
  //   }
  // }

  render() {
    // console.log(this.props.location.search);
    const { results } = this.state;
    return (
      <div>
        {results.map((result, index) => (
          <ul key={index}>
            <li>{result.description}</li>
          </ul>
        ))}
        {/* <NavFilterBar news={} /> */}
      </div>
    );
  }
}

export default SearchResults;
