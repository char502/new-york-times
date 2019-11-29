import React from "react";
import styled from "styled-components/macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// components
import LandingPage from "./pages/LandingPage";
import Nav from "./components/Nav/Nav";
import FetchNews from "./pages/FetchNews";
import SearchResults from "./pages/SearchResults";
import SavedNews from "./pages/SavedNews";
import LoadingProvider from "./loadingContext";
import Footer from "../src/components/Footer";
import "./index.css";

import newsSources from "./newsSources";

const AppContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 175px);
  flex-direction: column;
`;

const FourOhFour = () => <div>Not found</div>;

class App extends React.Component {
  render() {
    return (
      <div>
        <LoadingProvider>
          <Router>
            <AppContainer>
              <Nav />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                {newsSources.map(route => (
                  <Route
                    key={route.name}
                    path={`/${route.path}`}
                    exact
                    component={FetchNews}
                  />
                ))}
                <Route path="/search" component={SearchResults} />
                <Route path="/savedNews" component={SavedNews} />
                <Route path="*" component={FourOhFour} />
              </Switch>
            </AppContainer>
            <Footer />
          </Router>
        </LoadingProvider>
      </div>
    );
  }
}

export default App;
