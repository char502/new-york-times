import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import newsSources from "../newsSources";

// ======== Styled Components ========

const MobSourceLinksContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const NewsLink = styled(Link)`
  padding: 5px;
  font-size: 10px;
  display: inline-block;
  text-decoration: none;
  color: gray;
  &:first-child {
    padding-left: 0;
  }
`;
// ==========================================

const MobSourceLinks = () => (
  <MobSourceLinksContainer>
    {newsSources.map((link) => (
      <NewsLink key={link.name} to={`/${link.path}`}>
        {link.name.toUpperCase()}
      </NewsLink>
    ))}
  </MobSourceLinksContainer>
);

export default MobSourceLinks;
