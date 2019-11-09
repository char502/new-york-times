import React from "react";
import { withRouter /* Redirect */ } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Dropdown from "../../Dropdown";
import { SearchAndFilterButton } from "../../Button";
import { H2 } from "../../Typography";
import magGlass2 from "../../../Images/magGlass2.png";
// import FormErrors from "../../../FormErrors";
// import FormValidator from "../../../FormValidator";
// import Validator from "react-forms-validator";

// ======== Styled Components ========

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
  border-radius: 4px 0 0 4px;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-right: 0;
  outline: none;
  /* margin: 5px; */
`;

const StyledIcon = styled.div`
  height: 31px;
  width: 30px;

  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-left: 0;
  /* outline: none; */
  border-radius: 0 4px 4px 0;
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
  background-color: transparent;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  border-radius: 4px;
  outline: none;
  /* z-index: -1; */
`;

const ErrorMsg = styled.div`
  color: red;
  margin: 5px 0;
`;

// ===================================

const ValidationMessage = (props) => {
  console.log(props);
  if (!props.valid) {
    return <ErrorMsg>{props.message}</ErrorMsg>;
  }
  return null;
};

class SearchAndFilter extends React.Component {
  state = {
    searchTerm: "",
    filter: null,
    searchTermValid: false,
    formValid: false,
    errorMsg: {}
  };

  validateForm = () => {
    const { searchTermValid } = this.state;
    this.setState({
      formValid: searchTermValid
    });
  };

  handleInputchange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, this.validateSearchTerm);

    // this.setState({ searchTerm: e.target.value });
  };

  validateSearchTerm = () => {
    const { searchTerm } = this.state;
    let searchTermValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!searchTerm) {
      searchTermValid = false;
      errorMsg.searchTerm = "Please Enter a Search Term";
    }

    this.setState({ searchTermValid, errorMsg }, this.validateForm);
  };

  handleChange = (val) => {
    this.setState({ filter: val ? val.path : null });
  };

  isValidationError = (flag) => {
    this.setState({ isFormValidationErrors: flag });
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
    // console.log(this.props.location);
    return this.props.location.pathname === "/search" ? (
      <MainContainer>
        <StyledTitle>
          <H2>Search and Filter Options</H2>
        </StyledTitle>
        <Inner onSubmit={this.handleSubmit}>
          <FilterAndSearchContainer>
            <div style={{ display: "flex" }}>
              <Dropdown
                handleChange={this.handleChange}
                filter={this.state.filter}
              />
              <StyledInput
                type="text"
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleInputchange}
                placeholder="Enter Search......"
                autoFocus
              />
              <StyledIcon
                as={SearchAndFilterButton}
                onClick={this.handleSubmit}
                disabled={!this.state.formValid}
              >
                <MagGlass src={magGlass2} />
              </StyledIcon>
            </div>
            <div>
              <ValidationMessage
                valid={this.state.searchTermValid}
                message={this.state.errorMsg.searchTerm}
              />
            </div>
          </FilterAndSearchContainer>
        </Inner>
      </MainContainer>
    ) : null;
  }
}

export default withRouter(SearchAndFilter);
