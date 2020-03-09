import React from "react";
import styled from "styled-components/macro";

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

// let query = queryString.parse(this.props.location.search);
// if (!query.searchTerm) return null;
// if (results.length) {
//   return (
//     <SearchResultsContainer>
//       <SearchResultsContainerInner>
//         {results.map(result => (
//           <CardContainer key={result.url}>
//             <Card
//               data={result}
//               text="Save"
//               handleClick={this.handleSaveItem}
//               extended
//               showSource
//             />
//           </CardContainer>
//         ))}
//       </SearchResultsContainerInner>
//     </SearchResultsContainer>
//   );
// }

// if (!results.length && !loading) return <NoSearchResults />;
// return "";
