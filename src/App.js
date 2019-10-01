import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

// components
import Nav from "./components/Nav/Nav";
import "./index.css";
import newsRoutes from "./newsSources";
import SearchResults from "./pages/SearchResults";
import FetchNews from "./pages/FetchNews";

const FourOhFour = () => <div>Not found</div>;

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${newsRoutes[0].path}`} component={FetchNews} />
              </Route>
              {newsRoutes.map((route) => (
                <Route
                  key={route.name}
                  path={`/${route.path}`}
                  exact
                  component={FetchNews}
                />
              ))}
              <Route path="/search" component={SearchResults} />
              <Route path="*" component={FourOhFour} />
            </Switch>
          </div>
        </Router>
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
