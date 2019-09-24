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

  async componentDidMount(prevProps) {
    let searchTerm = this.props.location.search.split("=")[1];
    // console.log(searchTerm);
    this.setState({ loading: true });
    const news = await getSearchNews(searchTerm);
    console.log(news);
    this.setState({ loading: false, results: news.data.articles });
    console.log(this.state.results);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.results) {
  //     let searchTerm = this.props.location.search.split("=")[1];
  //     this.setState({ results: [] });
  //     // this.setState({ loading: true });
  //     const news = getSearchNews(searchTerm);
  //     console.log(news);
  //     // this.setState({ loading: false, results: news.data.articles });
  //   }
  // }

  render() {
    // console.log(this.props.location.search.split("=")[1]);
    console.log(this.props.location.search.split("=")[1]);
    // console.log(this.prevProps);
    return (
      <div>
        {this.state.results.map((result, index) => (
          <ul key={index}>
            <li>{result.description}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default SearchResults;
