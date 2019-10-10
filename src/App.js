import React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch
} from "react-router-dom";

// components
import LandingPage from "./pages/LandingPage";
import Nav from "./components/Nav/Nav";
import "./index.css";
import newsSources from "./newsSources";
import FetchNews from "./pages/FetchNews";
import SearchResults from "./pages/SearchResults";
import SavedNews from "./pages/SavedNews";
import LoadingProvider from "./loadingContext";

const FourOhFour = () => <div>Not found</div>;

class App extends React.Component {
  render() {
    return (
      <div>
        <LoadingProvider>
          <Router>
            <div>
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
            </div>
          </Router>
        </LoadingProvider>
      </div>
    );
  }
}

export default App;

// ask local storage for saved news array
// filter the saved news based on the creation date
// setState with the filtered news array
// save in local storage the filtered array

// clear all saved news ->  setting local storage to empty array
