import React from "react";
import styled from "styled-components/macro";

const CardContainer = styled.div`
  padding: 10px;
  border: 0.5px solid black;
  list-style-type: none;
  max-width: 600px;
  margin: 0 auto;
  margin: 10px;
  background-color: lightseagreen;
`;

const ImgContainer = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

// { item, handleAction, text, extended, author, publishedAt }

const Card = (props) => (
  <CardContainer>
    <li key={props.data.title}>
      <a href={props.data.url}>{props.data.title}</a>
      <button onClick={() => props.handleItem(props.data)}>{props.text}</button>
      {props.extended && (
        <div>
          <h4>Author: {props.data.author}</h4>
          <h5>Published At: {props.data.publishedAt}</h5>
          <div>
            <ImgContainer src={props.data.urlToImage} alt="" />
          </div>
        </div>
      )}
    </li>
  </CardContainer>
);

export default Card;
