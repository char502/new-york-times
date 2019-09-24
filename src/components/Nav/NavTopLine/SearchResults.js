import React from "react";
import { getSearchNews } from "../../../utils/api";

// const SearchResults = (props) => {
//   console.log(props);

//   return <div>These are the Search Results</div>;
// };

// export default SearchResults;

class SearchResults extends React.Component {
  state = {
    results: []
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const news = await getSearchNews(this.props.location.search);
    console.log(news);
    this.setState({ loading: false, results: news.data.articles });
    console.log(this.state.results);
  }

  render() {
    console.log(this.props.location.search.searchTerm);
    return (
      <div>
        {this.state.results.map((result, index) => (
          <div key={index}>{result.description}</div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
