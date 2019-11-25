import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import NavHomeButton from "../../NavHomeButton";
// import SearchInput from "../../SearchInput";
import { SearchAndFilterButton } from "../../Button";
import Dropdown from "../../Dropdown";
import magGlass2 from "../../../Images/magGlass2.png";

import SavedItems from "../../SavedItemsButton";
import MobSourceLinks from "../../MobSourceLinks";

const NavOnMobileContainer = styled.div`
  width: 100%;
  height: 75px;
`;

const NavOnMobileContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-right: 20px;
  position: relative;
  justify-content: flex-end;
`;

const BurgerIcon = styled.button`
  position: relative;
  z-index: 999;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`;

const MenuItemsContainer = styled.div`
  position: absolute;
  width: 275px;
  padding: 0 20px 20px 20px;
  right: 0;
  top: 0;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  z-index: 99;
  display: ${(props) => (props.showMenu ? "block" : "none")};
  background: white;
`;

const MenuItems = styled.div`
  position: relative;
  text-align: center;
  padding-top: 50px;
`;

// const MobSearchInputContainer = styled.div`
//   position: "absolute";
//   left: "100";
//   top: "2%";
//   border: 0.5px solid rgba(0, 0, 0, 0.2);
// `;

// const MobSearchFilterContainer = styled.div`
//   width: 100%;
//   position: "absolute";
//   left: "100";
//   top: "2%";
//   margin-top: 10px;
// `;

// const SAndF = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const ButtonContainer = styled.div`
  max-width: 120px;
  margin: auto;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`;

// const StyledIcon = styled.div`
//   height: 32px;
//   width: 30px;
//   cursor: pointer;
//   margin: 0;
//   padding: 0;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-left: 0;
//   border-radius: 0;
// `;

// const MagGlass = styled.img`
//   width: 20px;
//   height: 20px;
//   background-color: transparent;
//   border-radius: 4px;
//   outline: none;
// `;

const MobFilterAndSearchForm = styled.div`
  /* align-items: center; */
  text-align: center;
`;

const StyledInput = styled.input`
  margin-top: 10px;
  height: 28px;
  width: 233px;
  margin-right: 30%;
  padding-left: 13px;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  position: relative;
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
  position: absolute;
  top: 14.4%;
  right: 5%;
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 4px;
  outline: none;
`;

class NavOnMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      filter: null
      // searchTermValid: false,
      // formValid: false,
      // errorMsg: {}
    };
  }

  myRef = React.createRef();

  handleBurgerIconClick = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      // console.log("handleClickOutside if statement");
      this.setState({ isMenuOpen: false });
    }
  };

  handleInputchange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, this.validateSearchTerm);
    // this.setState({ searchTerm: e.target.value });
  };

  handleFilterChange = (val) => {
    this.setState({ filter: val ? val.path : null });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;
    console.log(searchTerm);

    // if (!searchTerm) {
    //   this.props.history.push(`/search?searchTerm`.trim());
    // } else {
    const searchQuery = queryString.parse(this.props.location.search);
    console.log(searchQuery);
    searchQuery.sources = this.state.filter;
    console.log(searchQuery.sources);
    searchQuery.searchTerm = this.state.searchTerm.trim();
    console.log(searchQuery.searchTerm);

    const stringifiedSearchQuery = queryString.stringify(searchQuery);
    console.log(stringifiedSearchQuery);
    this.props.history.push(`?${stringifiedSearchQuery}`);
    console.log(this.props.history);
    console.log(this.props.location);
    this.setState({ searchTerm: "", filter: "" });
    // }

    // if (!searchTerm) {
    //   this.props.history.push(`/search?searchTerm`.trim());
    // } else {
    //   const searchQuery = queryString.parse(this.props.location.search);
    //   console.log(searchQuery);
    //   searchQuery.sources = this.state.filter;
    //   console.log(searchQuery.sources);
    //   searchQuery.searchTerm = this.state.searchTerm.trim();
    //   console.log(searchQuery.searchTerm);
    //   const stringifiedSearchQuery = queryString.stringify(searchQuery);
    //   console.log(stringifiedSearchQuery);
    //   this.props.history.push(`?${stringifiedSearchQuery}`);
    //   this.setState({ searchTerm: "", filter: "" });
    // }

    // if (!searchTerm) {
    //   this.props.history.push(`/search?searchTerm`.trim());
    // } else {
    //   this.props.history.push(
    //     `/search?searchTerm=${this.state.searchTerm}`.trim()
    //   );
    //   this.setState({ searchTerm: "" });
    // }

    // const searchQuery = queryString.parse(this.props.location.search);
    // console.log(searchQuery);
    // searchQuery.sources = this.state.filter;
    // console.log(searchQuery.sources);
    // searchQuery.searchTerm = this.state.searchTerm.trim();
    // console.log(searchQuery.searchTerm);
    // const stringifiedSearchQuery = queryString.stringify(searchQuery);
    // console.log(stringifiedSearchQuery);
    // this.props.history.push(`?${stringifiedSearchQuery}`);
    // this.setState({ searchTerm: "", filter: "" });
    // e.preventDefault();

    // const { searchTerm } = this.state;

    // if (!searchTerm) {
    //   this.props.history.push(`/search?searchTerm`.trim());
    // } else {
    //   this.props.history.push(
    //     `/search?searchTerm=${this.state.searchTerm}`.trim()
    //   );
    //   this.setState({ searchTerm: "" });
    // }
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
    // let searchQuery = queryString.parse(this.props.location.search);
    // if (searchQuery.searchTerm) {
    //   this.setState({
    //     searchTerm: searchQuery.searchTerm
    //   });
    // }

    // if (searchQuery.sources) {
    //   this.setState({
    //     filter: searchQuery.sources,
    //     searchTerm: searchQuery.searchTerm
    //   });
    // }

    document.addEventListener("mousedown", this.handleClickOutside);
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

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    // this.setState({
    //   searchTerm: "",
    //   filter: null
    // });
  }

  render() {
    const { isMenuOpen } = this.state;
    return (
      <NavOnMobileContainer>
        <NavOnMobileContainerInner>
          <NavHomeButton />
          <NavSearchInputsContainer ref={this.myRef}>
            <BurgerIcon onClick={this.handleBurgerIconClick}>
              <i className="fas fa-bars fa-2x"></i>
            </BurgerIcon>
            <MenuItemsContainer showMenu={isMenuOpen}>
              <MenuItems>
                {/* ======================================= */}
                <MobFilterAndSearchForm>
                  <form onSubmit={this.handleSubmit}>
                    <Dropdown
                      handleChange={this.handleFilterChange}
                      filter={this.state.filter}
                    />
                    <StyledInput
                      type="text"
                      name="searchTerm"
                      value={this.state.searchTerm}
                      onChange={this.handleInputchange}
                      placeholder="Enter Search......"
                    />
                    <StyledIcon
                      as={SearchAndFilterButton}
                      onClick={this.handleSubmit}
                      disabled={this.state.searchTermError}
                    >
                      <MagGlass src={magGlass2} />
                    </StyledIcon>
                  </form>
                </MobFilterAndSearchForm>

                {/* ======================================= */}
                <ButtonContainer>
                  <SavedItems />
                </ButtonContainer>
                <MobSourceLinks />
              </MenuItems>
            </MenuItemsContainer>
          </NavSearchInputsContainer>
        </NavOnMobileContainerInner>
      </NavOnMobileContainer>
    );
  }
}

export default withRouter(NavOnMobile);
