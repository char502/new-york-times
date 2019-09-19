import React from "react";
import NewsApiRequest from "./components/ApiRequest/NewsApiRequest";

// components
import Nav from "./components/Nav/Nav";
import MainCarousel from "./components/Carousel/MainCarousel";

import "./App.css";
import "./index.css";

class App extends React.Component {
  state = {
    news: []
  };

  async componentDidMount() {
    const response = await NewsApiRequest.get();

    const news = response.data.articles;

    this.setState({
      news
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <MainCarousel newsData={this.state.news} />
      </div>
    );
  }
}

export default App;
