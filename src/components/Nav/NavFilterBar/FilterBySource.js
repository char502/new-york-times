import React from "react";
import queryString from "query-string";
import { getSearchNews } from "../../../utils/api";

class FilterBySource extends React.Component {
  state = {
    filteredResults: ""
  };

  // async componentDidMount() {
  //   let filterQuery = queryString.parse(this.props.location.search);
  //   // let filterQuery = queryString.parse(this.props.location.search);
  //   console.log(filterQuery);
  //   // this.setState({ loading: true });
  //   // // this.getData();
  //   const filteredNews = await getSearchNews(filterQuery.filter);
  //   // console.log(filteredNews);
  //   this.setState({
  //     loading: false,
  //     filteredResults: filteredNews.data.articles
  //   });
  //   // console.log(this.state.filteredResults);
  // }

  // https://newsapi.org/v2/everything?q=apples&sources=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  // https://newsapi.org/v2/everything?q=apples&id=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  // https://newsapi.org/v2/sources?id=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  // https://newsapi.org/v2/top-headlines?id=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  // https://newsapi.org/v2/everything?q=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  render() {
    // console.log(this.props.location.search);
    return (
      <div>
        <p>this is the 'FilterBySource' Component</p>
        {/* {this.props.results.source.map(
          (newsItem) => (
            console.log(newsItem);
          <select>
                      <option>{newsItem}</option>
                  </select>
          )
        )} */}
      </div>
    );
  }
}

export default FilterBySource;
