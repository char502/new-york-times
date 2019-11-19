import React from "react";
// import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import NavHomeButton from "../../NavHomeButton";
import SavedItems from "../../SavedItemsButton";
import SearchInput from "../../SearchInput";

import MobSourceLinks from "../../MobSourceLinks";

// ======== Styled Components ========

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
  /* justify-content: space-around; */
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-right: 20px;
  position: relative;
  justify-content: flex-end;
  /* margin-right: 24px; */
  /* background-color: red; */
  /* background-color: white; */
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
  /* background-color: white; */
  background-color: green;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  z-index: 99;
  display: ${(props) => (props.showMenu ? "block" : "none")};
`;

const MenuItems = styled.div`
  position: relative;
  text-align: center;
  padding-top: 50px;
`;

const MobSearchInputContainer = styled.div`
  position: "absolute";
  left: "100";
  top: "2%";
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  max-width: 120px;
  margin: auto;
  padding: 20px 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  /* background-color: blue; */
`;

const NewsSourceLinks = styled.div``;

// =====================================

class NavOnMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false
      // clickedOutside: false
    };
  }

  //=====================================================
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  myRef = React.createRef();
  //=====================================================

  handleBurgerIconClick = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      console.log("handleClickOutside if statement");
      this.setState({ isMenuOpen: false });
    }
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
                <MobSearchInputContainer>
                  <SearchInput />
                </MobSearchInputContainer>
                <ButtonContainer>
                  <SavedItems />
                </ButtonContainer>
                <NewsSourceLinks>
                  <MobSourceLinks />
                </NewsSourceLinks>
              </MenuItems>
            </MenuItemsContainer>
          </NavSearchInputsContainer>
        </NavOnMobileContainerInner>
      </NavOnMobileContainer>
    );
  }
}

export default NavOnMobile;
