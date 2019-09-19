import React from "react";
import styled from "styled-components";
import NewsApiRequest from "./components/ApiRequest/NewsApiRequest";
// components
import Nav from "./components/Nav/Nav";
import MainCarousel from "./components/Carousel/MainCarousel";

// import "./App.css";
import "./index.css";

const MainBodyContainer = styled.div`
  width: 100vw;
  background-color: LightSkyBlue;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

class App extends React.Component {
  state = {
    news: []
  };

  async componentDidMount() {
    const response = await NewsApiRequest.get();

    const news = response.data.articles;
    console.log(news);

    this.setState({
      news
    });
  }

  render() {
    // console.log(this.state.news);
    return (
      <div>
        <Nav />
        <MainBodyContainer>
          <MainBodyContainerInner>
            <MainCarousel newsData={this.state.news} />
          </MainBodyContainerInner>
        </MainBodyContainer>
      </div>
    );
  }
}

export default App;
