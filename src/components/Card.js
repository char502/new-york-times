import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { Title } from "./Typography";

const CardContainer = styled.div`
  padding-bottom: 20px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const ImgContainer = styled.img`
  display: block;
  margin: 0 auto;
  /* margin-left: auto;
  margin-right: auto; */
  width: 100%;
  /* padding: 20px 0; */
`;

const ImageAndTitleContainer = styled.div`
  margin: 0 auto;
`;

const StyledAuthor = styled.p`
  /* color: lightseagreen; */
  color: #548787;
  font-weight: bold;
  padding-top: 5px;
  margin: 0;
  font-size: 16px;
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
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button small onClick={() => props.handleClick(props.data)}>
          {props.text}
        </Button>
      </div>
    </div>
    <ImageAndTitleContainer>
      <ImgContainer src={props.data.urlToImage} alt="" />
      <Title style={{ textAlign: "justify" }} as="a" href={props.data.url}>
        {props.data.title}
      </Title>
    </ImageAndTitleContainer>
    {props.children}
  </CardContainer>
);

export default Card;
