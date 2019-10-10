import React from "react";
import styled from "styled-components/macro";

const CardContainer = styled.div`
  padding: 10px;
  border: 0.5px solid black;
  list-style-type: none;
  max-width: 500px;
  margin: 0 auto;
  margin: 10px;
  background-color: lightseagreen;
`;

const Card = ({ item, handleAction, text, extended, author, publishedAt }) => (
  <CardContainer>
    <li>
      <a href={item}>{item}</a>{" "}
      <button onClick={() => handleAction}>{text}</button>
      {extended && (
        <div>
          <h4>{author}</h4>
          <h5>Published At{publishedAt}</h5>
        </div>
      )}
    </li>
  </CardContainer>
);

// const Card = (props) => (
//     <li>
//         <a href={props.item}>{props.item}</a>{" "}
//         <button onClick={() => props.handleAction}>{props.text}</button>
//         {props.extended && (
//             <div>
//                 This is the extended item information - the metadata(createdAt etc?)
//       </div>
//         )}
//     </li>
// );

export default Card;
