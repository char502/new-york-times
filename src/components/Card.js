import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { Title } from "./Typography";

const CardContainer = styled.div`
  padding: 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const ImgContainer = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* padding: 20px 0; */
`;

const StyledLink = styled.a`
  color: rgba(0.84);
  font-size: 18px;
  padding: 20px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  &:active {
    color: rgba(0.84);
  }
`;

// const StyledLink = styled.a`
//   font-size: 18px;
//   text-decoration: none;
//   color: rgba(0.84);
// `;

const StyledAuthor = styled.p`
  color: lightseagreen;
  padding-top: 5px;
  margin: 0;
  font-size: 16px;
`;

const StyledPublished = styled.p`
  /* padding: 12px; */
  padding: 5px 0;
  margin: 0;
  font-size: 8px;
  color: grey;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const HrDiv = styled.div`
  padding: 10px;
`;

// { item, handleAction, text, extended, author, publishedAt }

const Card = (props) => (
  <CardContainer>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <StyledAuthor>Author: {props.data.author}</StyledAuthor>
        <StyledPublished>
          Published At: {moment(props.data.publishedAt).fromNow()}
        </StyledPublished>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button small onClick={() => props.handleClick(props.data)}>
          {props.text}
        </Button>
      </div>
    </div>
    <ImgContainer src={props.data.urlToImage} alt="" />

    <Title as="a" href={props.data.url}>
      {props.data.title}
    </Title>

    {props.children}
  </CardContainer>
);

export default Card;
