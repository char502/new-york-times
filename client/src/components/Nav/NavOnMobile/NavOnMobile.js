import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router-dom";
import NavHomeButton from "../../NavHomeButton";
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

const ButtonContainer = styled.div`
  max-width: 120px;
  margin: auto;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const MobFilterAndSearchForm = styled.div`
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
  state = {
    isMenuOpen: false
  };

  myRef = React.createRef();

  handleBurgerIconClick = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ isMenuOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleSubmit = (e) => {
    this.props.handleSubmit(e);
    this.setState({ isMenuOpen: false });
  };

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
                <MobFilterAndSearchForm>
                  <form onSubmit={this.handleSubmit}>
                    <Dropdown
                      handleChange={this.props.handleFilterChange}
                      filter={this.props.filter}
                    />
                    <StyledInput
                      type="text"
                      name="searchTerm"
                      value={this.props.searchTerm}
                      onChange={this.props.handleInputchange}
                      placeholder="Enter Search......"
                    />
                    <StyledIcon
                      as={SearchAndFilterButton}
                      onSubmit={this.handleSubmit}
                      disabled={this.props.searchTermError}
                    >
                      <MagGlass src={magGlass2} />
                    </StyledIcon>
                  </form>
                </MobFilterAndSearchForm>
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
