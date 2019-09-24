import React from "react";
// import styled from "styled-components";
import styled from "styled-components/macro";

// components
import NavTopLine from "./NavTopLine/NavTopLine";
import NavBottomLine from "./NavBottomLine/NavBottomLine";

// ======== Styled Components ========
const NavBarContainer = styled.div`
  width: 100vw;
  background-color: green;
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
    <NavBarInner>
      <NavTopLine />
      <NavBottomLine />
    </NavBarInner>
  </NavBarContainer>
);

export default Nav;
