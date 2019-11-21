import React from "react";
import styled from "styled-components/macro";
// import SearchAndFilter from "../components/Nav/NavSearchAndFilter/SearchAndFilter";

const NoSearches = styled.div`
  color: red;
  width: 230px;
  height: 20px;
  margin: 30px auto;
  text-align: center;
  padding: 20px;
  border: 0.5px solid red;
`;

const NoSearchResults = () => {
  return <NoSearches>No Search Results Found</NoSearches>;
};

export default NoSearchResults;
