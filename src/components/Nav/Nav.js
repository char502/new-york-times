import React from "react";
import styled from "styled-components/macro";
import Media from "react-media";

// components
import NavTopLine from "./NavTopLine/NavTopLine";
import NavBottomLine from "./NavBottomLine/NavBottomLine";
import NavSearchAndFilter from "./NavSearchAndFilter/NavSearchAndFilter";
import NavOnMobile from "./NavOnMobile/NavOnMobile";

// ======== Styled Components ========
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
// ===================================

const Nav = () => (
  <NavBarContainer>
    <Media query={{ maxWidth: 599 }}>
      {(matches) =>
        matches ? (
          <NavBarInner>
            <NavOnMobile />
          </NavBarInner>
        ) : (
          <NavBarInner>
            <NavTopLine />
            <NavBottomLine />
            <NavSearchAndFilter />
          </NavBarInner>
        )
      }
    </Media>
  </NavBarContainer>
);

export default Nav;
