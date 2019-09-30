import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// components
import Nav from "./components/Nav/Nav";
import "./index.css";
import newsRoutes from "./newsSources";
import SearchResults from "./pages/SearchResults";
import FetchNews from "./pages/FetchNews";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
