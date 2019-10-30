import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import newsSources from "../../../newsSources";

const NavBottomLineContainer = styled.div`
  width: 100%;
  height: 45px;
`;

const NavBottomLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewsLink = styled(Link)`
  padding: 5px 13px;
  display: flex;
  align-items: center;
  font-size: 10px;
  display: inline-block;
  text-decoration: none;
  color: gray;
  &:first-child {
    padding-left: 0;
  }
  /* &:last-child {
    padding-right: 0;
  } */
`;

const NavBottomLine = () => (
  <NavBottomLineContainer>
    <NavBottomLineContainerInner>
      {newsSources.map((link) => (
        <NewsLink key={link.name} to={`/${link.path}`}>
          {link.name.toUpperCase()}
        </NewsLink>
      ))}
    </NavBottomLineContainerInner>
  </NavBottomLineContainer>
);

export default NavBottomLine;
