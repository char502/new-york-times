import React from "react";
import styled from "styled-components";

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

// const newsSources = [
//   {
//     "id": "abc-news",
//     "name": "ABC News"
//   }
//   {
//     "id": "ars-technica",
//     "name": "Ars Technica",
//   },
//   {
//     "id": "bbc-news",
//     "name": "BBC News"
//   },
//   {
//     "id": "bloomberg",
//     "name": "Bloomberg"
//   },
//   {
//     "id": "crypto-coins-news",
//     "name": "Crypto Coins News"
//   },
//   {
//     "id": "hacker-news",
//     "name": "Hacker News"
//   },
//   {
//     "id": "ign",
//     "name": "IGN",
//   },
//   {
//     "id": "mashable",
//     "name": "Mashable"
//   },
//   {
//     "id": "metro",
//     "name": "Metro"
//   },
//   {
//     "id": "national-geographic",
//     "name": "National Geographic"
//   },
//   {
//     "id": "new-scientist",
//     "name": "New Scientist"
//   },
//   {
//     "id": "newsweek",
//     "name": "Newsweek"
//   },
//   {
//     "id": "next-big-future",
//     "name": "Next Big Future",
//   },
//   {
//     "id": "polygon",
//     "name": "Polygon"
//   },
//   {
//     "id": "recode",
//     "name": "Recode"
//   },
//   {
//     "id": "the-verge",
//     "name": "The Verge"
//   },
//   {
//     "id": "time",
//     "name": "Time"
//   },
//   // {
//   //   "id": /* "All" not sure */
//   //     "name": "All",

//   // },
// ]

// Api endpoint: https://newsapi.org/v2/sources?language=en&apiKey=844f83db9ed44325a55725ad85a1592c

// ===========================

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
