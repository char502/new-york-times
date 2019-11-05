import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Dropdown from "../../Dropdown";
import { Button } from "../../Button";
import { H2 } from "../../Typography";

// ======== Styled Components ========

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  background-color: WhiteSmoke;
  /* border-bottom: 0.5px solid rgba(0, 0, 0, 0.2); */
`;

const StyledTitle = styled.div`
  margin: 20px 0 0 10px;
  padding: 10px 0;
  font-family: "Vidaloka", serif;
`;

const Inner = styled.form`
  height: 100%;
  width: 100%;
  /* margin: 0 auto; */
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  /* margin-left: 50px; */
`;

const StyledInput = styled.input`
  height: 28px;
  width: 350px;
  padding-left: 25px;
  border-radius: 4px;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  outline: none;
  /* margin: 5px; */
`;

const FilterAndSearchContainer = styled.div`
  display: flex;
  margin: 10px;
`;

// ===================================

class SearchAndFilter extends React.Component {
  state = {
    searchTerm: "",
    filter: null
  };

  newInputRef = React.createRef();

  handleChange = (val) => {
    this.setState({ filter: val ? val.path : null });
  };

  handleInputchange = (e) => {
    // e.preventDefault();
    // this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = queryString.parse(this.props.location.search);

    searchQuery.sources = this.state.filter;
    searchQuery.searchTerm = this.state.searchTerm;

    const stringifiedSearchQuery = queryString.stringify(searchQuery);
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
    console.log(searchQuery.searchTerm);
    if (searchQuery.searchTerm) {
      this.setState({
        searchTerm: searchQuery.searchTerm
      });
      this.newInputRef.current.focus();
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
  }
  render() {
    return this.props.location.pathname === "/search" ? (
      <MainContainer>
        {/* =================================== */}
        <StyledTitle>
          <H2>Search and filter Options</H2>
        </StyledTitle>

        <Inner onSubmit={this.handleSubmit}>
          <FilterAndSearchContainer>
            <Dropdown
              handleChange={this.handleChange}
              filter={this.state.filter}
            />
            <StyledInput
              ref={this.newInputRef}
              value={this.state.searchTerm}
              onChange={this.handleInputchange}
              /* placeholder="Enter Search....." */
            />
            <Button
              disabled={!this.state.searchTerm}
              style={{ margin: "0 auto" }}
              onClick={this.handleSubmit}
            >
              Search
            </Button>
          </FilterAndSearchContainer>
        </Inner>
      </MainContainer>
    ) : null;
  }
}

export default withRouter(SearchAndFilter);
