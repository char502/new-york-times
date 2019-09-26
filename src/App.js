import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { getNews } from "./utils/api";
// components
import Nav from "./components/Nav/Nav";
import MainCarousel from "./components/Carousel/MainCarousel";
import "./index.css";
import newsRoutes from "./newsSources";
import SearchResults from "./components/Nav/NavTopLine/SearchResults";
import FilterBySource from "./components/Nav/NavFilterBar/FilterBySource";
import NavFilterBar from "./components/Nav/NavFilterBar/NavFilterBar";

// ======== Styled Components ========
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
// ===================================

class FetchNews extends React.Component {
  state = {
    news: []
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getNews(this.props.location.pathname.split("/")[1]);
    // why include the "/" then take it away again with split
    // Is it because Rreact-Router requires it but the api call
    // via axios doesn't?
    const news = response.data.articles;
    console.log(this.props);
    this.setState({
      loading: false,
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
                path={`/${route.path}`}
                // Just check, why is path here twice?
                // standard Route <Route path="/create" component={ComponentToRender} />
                exact
                component={FetchNews}
              />
            ))}
            <Route path="/search" component={SearchResults} />
            {/* <Route path="/filter" component={NavFilterBar} /> */}
            {/* <Route path="/search" component={FilterDate} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

// https://newsapi.org/v2/everything?q=france&apiKey=844f83db9ed44325a55725ad85a1592c
