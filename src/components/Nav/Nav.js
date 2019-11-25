import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import queryString from "query-string";
import NavTopLine from "./NavTopLine/NavTopLine";
import NavBottomLine from "./NavBottomLine/NavBottomLine";
import NavSearchAndFilter from "./NavSearchAndFilter/NavSearchAndFilter";
import NavOnMobile from "./NavOnMobile/NavOnMobile";

const NavBarContainer = styled.div`
  width: 100vw;
  /* background-color: green; */
`;

const NavBarInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

class Nav extends React.Component {
  state = {
    searchTerm: "",
    filter: null,
    searchTermValid: false,
    formValid: false,
    errorMsg: {}
  };

  searchAndFilterinputRef = React.createRef();

  handleInputchange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, this.validateSearchTerm);
    // this.setState({ searchTerm: e.target.value });
  };

  validateSearchTerm = () => {
    const { searchTerm } = this.state;
    let searchTermError = false;
    let errorMsg = { ...this.state.errorMsg };

    if (!searchTerm) {
      searchTermError = true;
      errorMsg.searchTerm = "Please Enter a Search Term";
    }

    this.setState({
      searchTermError,
      errorMsg
    });
  };

  handleFilterChange = val => {
    this.setState({ filter: val ? val.path : null });
  };

  isValidationError = bool => {
    this.setState({ searchTermError: bool });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = queryString.parse(this.props.location.search);

    searchQuery.sources = this.state.filter;

    searchQuery.searchTerm = this.state.searchTerm.trim();

    const stringifiedSearchQuery = queryString.stringify(searchQuery);

    this.props.history.push(`/search?${stringifiedSearchQuery}`);
    this.setState({ searchTerm: "", filter: "" });
  };

  componentDidMount() {
    let searchQuery = queryString.parse(this.props.location.search);
    if (searchQuery.searchTerm) {
      this.setState({
        searchTerm: searchQuery.searchTerm
      });
    }

    if (searchQuery.sources) {
      this.setState({
        filter: searchQuery.sources,
        searchTerm: searchQuery.searchTerm
      });
    }
  }

  componentDidUpdate(prevProps) {
    //Used here because want something to happen after the state is updated?
    if (prevProps.location.search !== this.props.location.search) {
      let searchQuery = queryString.parse(this.props.location.search);
      this.setState({
        filter: searchQuery.sources,
        searchTerm: searchQuery.searchTerm
      });
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        searchTermError: false
      });
    }
  }

  render() {
    return (
      <NavBarContainer>
        <Media query={{ maxWidth: 769 }}>
          {matches =>
            matches ? (
              <NavBarInner>
                <NavOnMobile
                  handleInputchange={this.handleInputchange}
                  handleFilterChange={this.handleFilterChange}
                  handleSubmit={this.handleSubmit}
                  {...this.state}
                />
              </NavBarInner>
            ) : (
              <NavBarInner>
                <NavTopLine />
                <NavBottomLine />
                <NavSearchAndFilter
                  {...this.state}
                  handleSubmit={this.handleSubmit}
                  handleFilterChange={this.handleFilterChange}
                  handleInputchange={this.handleInputchange}
                />
              </NavBarInner>
            )
          }
        </Media>
      </NavBarContainer>
    );
  }
}

export default withRouter(Nav);
