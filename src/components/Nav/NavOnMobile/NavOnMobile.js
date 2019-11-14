import React from "react";
// import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import NavHomeButton from "../../NavHomeButton";
import SavedItems from "../../SavedItemsButton";
import SearchInput from "../../SearchInput";

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
  justify-content: space-around;
  align-items: center;
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  /* margin-right: 24px; */
  margin-right: 20px;
  position: relative;
  background-color: white;
  justify-content: flex-end;
`;

const BurgerIcon = styled.div`
  position: relative;
  z-index: 999;
  cursor: pointer;
`;

const MenuItemsContainer = styled.div`
  position: absolute;
  width: 40vw;
  padding: 0 20px 20px 20px;
  top: 0;
  right: 0;
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  z-index: 99;
  visibility: ${(props) => (props.showMenu ? "visible" : "hidden")};
`;

const MenuItems = styled.div`
  text-align: center;
  padding-top: 50px;
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
    };
  }

  handleBurgerIconClick = () => {
    console.log(this.state.isMenuOpen);
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };
  render() {
    const { isMenuOpen } = this.state;
    return (
      <NavOnMobileContainer>
        <NavOnMobileContainerInner>
          <NavHomeButton />
          <NavSearchInputsContainer>
            <BurgerIcon onClick={this.handleBurgerIconClick}>
              <i className="fas fa-bars fa-2x"></i>
            </BurgerIcon>
            <MenuItemsContainer showMenu={isMenuOpen}>
              <MenuItems>
                <p>Search Icon</p>
                <ButtonContainer>
                  <SavedItems />
                </ButtonContainer>
                <NewsSourceLinks>
                  <p>
                    <SearchInput />
                  </p>
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
