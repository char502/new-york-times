import React from "react";
import styled from "styled-components";

const NavBottomLineContainer = styled.div`
  width: 100vw;
  height: 45px;
  background-color: blue;
`;

const NavBottomLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  /* background-color: blue; */
`;

const NavBarItems = [
  "World",
  "US",
  "Politics",
  "N.Y",
  "Business",
  "Opinion",
  "Tech",
  "Science",
  "Health",
  "Sports",
  "Arts",
  "Style",
  "Food",
  "Travel",
  "Magazine",
  "T Magazine",
  "Real Estate",
  "All"
];

const NewsLink = styled.div`
  padding: 5px 15px 5px 15px;
  display: flex;
  align-items: center;
  font-size: 10px;
  display: inline-block;
`;

const NavBottomLine = () => (
  <NavBottomLineContainer>
    <NavBottomLineContainerInner>
      {NavBarItems.map((item) => (
        <NewsLink key={item}>{item}</NewsLink>
      ))}
    </NavBottomLineContainerInner>
  </NavBottomLineContainer>
);

export default NavBottomLine;
