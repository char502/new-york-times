import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../utils/api";
import moment from "moment";

class SearchResults extends React.Component {
  state = {
    results: [],
    resultsToSave: JSON.parse(localStorage.getItem("newArrList"))
    // isSaveClicked: false
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

  handleSaveItem = (result) => {
    // e.preventDefault();

    const savedResult = {
      ...result,
      savedAt: moment().format("MMMM Do YYYY, h:mm:ss a")
    };

    let newsArr = [];

    if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));
    }
    newsArr.push(savedResult);
    localStorage.setItem("savedNews", JSON.stringify(newsArr));

    // if (localStorage.getItem("newArrList") === null) {
    //   let newsArr = [];
    //   newsArr.push({ resultSet });
    //   localStorage.setItem("newArrList", JSON.stringify(newsArr));
    // } else {
    //   let newsArr = JSON.parse(localStorage.getItem("newArrList"));
    //   newsArr.push({ resultSet });
    //   localStorage.setItem("newArrList", JSON.stringify(newsArr));
    // }
    // this.setState({
    //   resultsToSave: JSON.parse(localStorage.getItem("newArrList"))
    // });
    // console.log(this.state.resultsToSave);
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.map((result, index) => (
          <ul key={index}>
            <li>
              <a href={result.url}>{result.title}</a>{" "}
              <button
                value={result}
                /* id={index} */
                onClick={() => this.handleSaveItem(result)}
              >
                {/* {this.state.isSaveClicked ? "Remove" : "Save"} */}
                Save
              </button>
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

export default SearchResults;
