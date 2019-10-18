import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { H3 } from "./Typography";
import imagePlaceholder from "../Images/imagePlaceholder.png";

const CardContainer = styled.div`
  padding: 5px;
  width: 550px;
  height: 350px;
  margin: auto;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* background: lightsteelblue; */
`;

const ImgContainer = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 85%;
  align-items: center;
  /* border: 1px solid gray; */
  /* box-shadow: 5px 10px lightGray; */
`;

const ImagePlaceHolder = styled.img``;

const TitleContainer = styled.div`
  padding: 20px 20px 0 20px;
  text-align: center;
`;

const StyledAuthor = styled.p`
  color: lightseagreen; /* try poss forest green */
  /* color: #548787; */
  font-weight: bold;
  padding-top: 10px;
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

const ActionButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BorderBottom = styled.div`
  padding: 15px;
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
      <ActionButton>
        <Button small onClick={() => props.handleClick(props.data)}>
          {props.text}
        </Button>
      </ActionButton>
    </div>
    <ImgContainer
      src={
        props.data.urlToImage ? (
          props.data.urlToImage
        ) : (
          <ImagePlaceHolder src={imagePlaceholder} />
        )
      }
      alt=""
    />
    <TitleContainer>
      <H3 as="a" href={props.data.url}>
        {props.data.title}
      </H3>
    </TitleContainer>
    {props.children}
    {props.extended && (
      <BorderBottom
        style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)" }}
      />
    )}
  </CardContainer>
);

export default Card;
