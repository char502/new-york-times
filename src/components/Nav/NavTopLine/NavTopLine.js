import React from "react";
import styled from "styled-components";

const NavTopLineContainer = styled.div`
  width: 100vw;
  height: 50px;
  background-color: red;
`;

const NavTopLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  /* background-color: red; */
`;
// const SectionsButton = styled.div`
//     width: 73;
//     height: 22;
//     background-color: yellow
// `

const NavTopLine = () => (
  <NavTopLineContainer>
    <NavTopLineContainerInner>
      <h1>This is Nav Top Line</h1>
    </NavTopLineContainerInner>
  </NavTopLineContainer>
);

export default NavTopLine;
