import React from "react";
// import styled from "styled-components";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import newsSources from "../../../newsSources";

const NavBottomLineContainer = styled.div`
  width: 100%;
  height: 45px;
  background-color: yellow;
`;

const NavBottomLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const NewsLink = styled(Link)`
  padding: 5px 15px 5px 15px;
  display: flex;
  align-items: center;
  font-size: 10px;
  display: inline-block;
  text-decoration: none;
  color: black;
`;

const NavBottomLine = () => (
  <NavBottomLineContainer>
    <NavBottomLineContainerInner>
      {newsSources.map((link) => (
        <NewsLink key={link.name} to={`/${link.path}`}>
          {link.name}
        </NewsLink>
      ))}
    </NavBottomLineContainerInner>
  </NavBottomLineContainer>
);

export default NavBottomLine;
