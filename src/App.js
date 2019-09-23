import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import api from "./utils/api";
// components
import Nav from "./components/Nav/Nav";
import MainCarousel from "./components/Carousel/MainCarousel";
import "./index.css";
import newsRoutes from "./newsSources";

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

class FetchNews extends React.Component {
  state = {
    news: []
  };

  async componentDidMount() {
    const response = await api(this.props.path.split("/")[1]);

    console.log(response);
    const news = response.data.articles;

    console.log(news);
    this.setState({
      news
    });
  }
  render() {
    return (
      <MainBodyContainer>
        {this.props.path}
        <MainBodyContainerInner>
          <MainCarousel newsData={this.state.news} />
        </MainBodyContainerInner>
      </MainBodyContainer>
    );
  }
}

// const Container = (props) => <div>{props.renderComponent()}</div>;

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            {newsRoutes.map((route) => (
              <Route
                key={route.name}
                path={route.path}
                exact
                component={(props) => (
                  <FetchNews {...props} path={route.path} />
                )}
              />
              // Are components being generated on the fly here?
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
