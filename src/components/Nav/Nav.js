import React from "react";
import styled from "styled-components";

// components
import NavTopLine from "./NavTopLine/NavTopLine";
import NavBottomLine from "./NavBottomLine/NavBottomLine";

const NavBarContainer = styled.div`
  width: 100vw;
  height: 100px;
  background-color: green;
`;

const NavBarInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  padding: 0 16px 0 16px;
`;

const Nav = () => (
  <NavBarContainer>
    <NavBarInner>
      <NavTopLine />
      <NavBottomLine />
    </NavBarInner>
  </NavBarContainer>
);

export default Nav;
