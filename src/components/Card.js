import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { H3 } from "./Typography";

const CardContainer = styled.div`
  padding-bottom: 20px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  width: 50%;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 32px;
  /* background: lightsteelblue; */
`;

const ImgContainer = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  /* height: 85%; */
  align-items: center;
  /* border: 1px solid gray; */
  /* box-shadow: 5px 10px lightGray; */
`;

const TitleContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const StyledAuthor = styled.p`
  color: lightseagreen;
  /* color: #548787; */
  font-weight: bold;
  padding-top: 5px;
  margin: 0;
  font-size: 15px;
`;

const StyledPublished = styled.p`
  /* padding: 12px; */
  padding: 5px 0;
  margin: 0;
  font-size: 10px;
  color: grey;
`;

// { item, handleAction, text, extended, author, publishedAt }

const Card = (props) => (
  <CardContainer>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <StyledAuthor>Author: {props.data.author}</StyledAuthor>
        <StyledPublished>
          Published: {moment(props.data.publishedAt).fromNow()}
        </StyledPublished>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Button small onClick={() => props.handleClick(props.data)}>
          {props.text}
        </Button>
      </div>
    </div>

    <ImgContainer src={props.data.urlToImage} alt="" />
    <TitleContainer>
      <H3 as="a" href={props.data.url}>
        {props.data.title}
      </H3>
    </TitleContainer>

    {props.children}
  </CardContainer>
);

export default Card;
