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

// { item, handleAction, text, extended, author, publishedAt }

const Card = (props) => (
  <CardContainer>
    <li>
      <a href={props.url}>{props.title}</a>{" "}
      <button onClick={() => props.handleSaveItem(props)}>{props.text}</button>
      {/* {extended && (
        <div>
          <h4>{author}</h4>
          <h5>Published At{publishedAt}</h5>
        </div>
      )} */}
    </li>
  </CardContainer>
);

// const Card = (props) => (
//   console.log(item),
//   (
//     <CardContainer>
//       <li>
//         <div>
//           <a href={item.url}>{item.title}</a>
//         </div>
//         <div>{item.description}</div>
//         {item.extended && (
//           <div>
//             <h4>{item.author}</h4>
//             <h5>Published At: {item.publishedAt}</h5>
//           </div>
//         )}
//         <div>
//           <button onClick={() => this.handleAction}>{item.text}</button>
//         </div>
//       </li>
//     </CardContainer>
//   )
// );

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
