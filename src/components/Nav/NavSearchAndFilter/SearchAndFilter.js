import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Dropdown from "../../Dropdown";
import { Button } from "../../Button";

// ======== Styled Components ========

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  background-color: WhiteSmoke;
  /* border-bottom: 0.5px solid rgba(0, 0, 0, 0.2); */
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  /* height: 100%; */
  /* background-color: lightgrey; */
  margin: 20px;
  padding-bottom: 10px;
  /* padding-bottom: 40px; when filter buttons active*/
  /* flex: 1; */
  /* padding-bottom: ${(props) =>
    props.filterActive ? "12px" : "transparent"}; */
`;

const StyledInput = styled.input`
  height: 28px;
  width: 210px;
  padding-left: 25px;
  border-radius: 4px;
  font-family: Roboto Condensed;
  font-size: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  outline: none;
  margin: 5px;
`;

const FilterContainer = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: row;
  /* flex: 1; */
  margin: 10px;
  /* background-color: lightgrey; */
`;

// ===================================

class SearchAndFilter extends React.Component {
  state = {
    searchTerm: "",
    filter: ""
  };

  newInputRef = React.createRef();

  handleChange = (val) => {
    this.setState({ filter: val.path });
  };

  handleInputchange = (e) => {
    e.preventDefault();
    // this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);
    this.setState({ searchTerm: e.target.value });
    this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = queryString.parse(this.props.location.search);
    searchQuery.sources = this.state.filter;
    const stringifiedSearchQuery = queryString.stringify(searchQuery);
    console.log(stringifiedSearchQuery);
    this.props.history.push(`?${stringifiedSearchQuery}`);

    this.setState({ filter: "" });
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
    }
    console.log(this.inputRef);
    // this.inputRef.current.focus();

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
      //   this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);
    }
  }
  render() {
    return this.props.location.pathname === "/search" ? (
      <MainContainer>
        <Inner onSubmit={this.handleSubmit}>
          {/* =================================== */}
          <SearchContainer>
            <label>
              <p>You are searching for:</p>
              <StyledInput
                ref={this.newInputRef}
                value={this.state.searchTerm}
                onChange={this.handleInputchange}
              ></StyledInput>
            </label>
          </SearchContainer>
          <FilterContainer>
            <label>
              <p>Filter by news source</p>
              <Dropdown
                handleChange={this.handleChange}
                filter={this.state.filter}
              />
              <div style={{ margin: "5px", display: "flex" }}>
                {this.state.filter && (
                  <Button
                    style={{ marginLeft: "5px" }}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                )}
                {this.state.filter && (
                  <Button
                    style={{ margin: "0", marginLeft: "5px", display: "flex" }}
                    onClick={this.handleClearFilter}
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            </label>
          </FilterContainer>
        </Inner>

        {/* <SearchContainer>
          /* <label>
            <p>You are searching for:</p>
            <StyledInput
              value={this.state.searchTerm}
              onChange={this.handleInputchange}
            ></StyledInput>
          </label>
        </SearchContainer> */}
      </MainContainer>
    ) : null;
  }
}

export default withRouter(SearchAndFilter);
