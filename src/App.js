import React from "react";
import axios from "axios";
import Slider from "react-slick";

import "./App.css";
import "./index.css";

class App extends React.Component {
  state = {
    news: []
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=gb&apiKey=844f83db9ed44325a55725ad85a1592c"
    );

    console.log(response);
    const news = response.data.articles;

    this.setState({
      news
    });
  }

  render() {
    console.log(this.state.news);

    const settings = {
      dots: true,
      infinite: true,
      speed: 10000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Single Item</h2>
        {/* {this.state.news.map((article) => (
          <div key={article.title}>{article.title}</div>
        ))} */}
        <Slider {...settings}>
          {this.state.news.map((article) => (
            <div key={article.title}>{article.title}</div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default App;
