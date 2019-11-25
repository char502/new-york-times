import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Dropdown from "../../Dropdown";
import { SearchAndFilterButton } from "../../Button";
import { H2 } from "../../Typography";
import magGlass2 from "../../../Images/magGlass2.png";
import ValidationMessage from "../../ValidationMessage";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: WhiteSmoke;
`;

const StyledTitle = styled.div`
  margin: 20px 0 0 10px;
  padding: 10px 0;
  font-family: "Vidaloka", serif;
`;

const FilterAndSearchContainer = styled.div`
  margin: 10px;
  text-align: center;
`;

const Inner = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledInput = styled.input`
  height: 28px;
  width: 350px;
  padding-left: 25px;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 0;
  border-left: 0;
  outline: none;
`;

const StyledIcon = styled.div`
  height: 32px;
  width: 30px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 0;
  border-radius: 0;
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 4px;
  outline: none;
`;

class NavSearchAndFilter extends React.Component {
  state = {
    searchTerm: "",
    filter: null,
    searchTermValid: false,
    formValid: false,
    errorMsg: {}
  };

  searchAndFilterinputRef = React.createRef();

  handleInputchange = (e) => {
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

  handleChange = (val) => {
    this.setState({ filter: val ? val.path : null });
  };

  isValidationError = (bool) => {
    this.setState({ searchTermError: bool });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = queryString.parse(this.props.location.search);
    console.log(searchQuery);
    searchQuery.sources = this.state.filter;
    console.log(searchQuery.sources);
    searchQuery.searchTerm = this.state.searchTerm.trim();
    console.log(searchQuery.searchTerm);
    const stringifiedSearchQuery = queryString.stringify(searchQuery);
    console.log(stringifiedSearchQuery);
    this.props.history.push(`?${stringifiedSearchQuery}`);
    this.setState({ searchTerm: "", filter: "" });
  };

  handleClearFilter = (e) => {
    e.preventDefault();
    let searchQuery = queryString.parse(this.props.location.search);
    if (searchQuery.sources) {
      delete searchQuery.sources;
      this.setState({ filter: "" });
      const filterKeyRemovedQuery = queryString.stringify(searchQuery);
      this.props.history.push(`?${filterKeyRemovedQuery}`);
    }
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
    return this.props.location.pathname === "/search" ? (
      <MainContainer>
        <StyledTitle>
          <H2>Search and Filter Options</H2>
        </StyledTitle>
        <Inner onSubmit={this.props.handleSubmit}>
          <FilterAndSearchContainer>
            <div style={{ display: "flex" }}>
              <Dropdown
                handleChange={this.props.handleChange}
                filter={this.props.filter}
              />
              <StyledInput
                type="text"
                name="searchTerm"
                value={this.props.searchTerm}
                onChange={this.props.handleInputchange}
                placeholder="Enter Search......"
                autoFocus
              />
              <StyledIcon
                as={SearchAndFilterButton}
                onClick={this.props.handleSubmit}
                disabled={this.props.searchTermError}
              >
                <MagGlass src={magGlass2} />
              </StyledIcon>
            </div>
            <div>
              <ValidationMessage
                invalid={this.props.searchTermError}
                message={this.props.errorMsg.searchTerm}
              />
            </div>
          </FilterAndSearchContainer>
        </Inner>
      </MainContainer>
    ) : null;
  }
}

export default withRouter(NavSearchAndFilter);
