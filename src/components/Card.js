import React from "react";
import styled, { css } from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { TitleLink } from "./Typography";
import imagePlaceholder from "../Images/imagePlaceholder.png";

const CardContainer = styled.div`
  max-width: 600px;
  min-height: 450px;
  margin: 0 auto;

  ${(props) => {
    return (
      props.padded &&
      css`
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
        padding: 15px;
      `
    );
  }}
`;

const ImgContainer = styled.div`
  width: 100%;
  background: url(${(props) => props.src}) no-repeat center;
  background-size: cover;
  padding-top: 59.32%;
  display: block;
  margin: 0 auto;
  align-items: center;
`;

const TitleContainer = styled.div`
  padding-top: 20px;
  font-weight: bold;
`;

const StyledSource = styled.div`
  color: darkgray;
  margin-top: 12px;
  font-size: 11px;
`;

const StyledAuthor = styled.p`
  color: lightseagreen;
  font-weight: bold;
  padding-top: 10px;
  margin: 0;
  font-size: 15px;
`;

const StyledPublished = styled.p`
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

const Card = (props) => {
  return (
    <CardContainer padded={props.extended}>
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
      <div>
        <ImgContainer
          src={props.data.urlToImage ? props.data.urlToImage : imagePlaceholder}
        />
        <TitleContainer>
          <TitleLink href={props.data.url} target="_blank">
            {props.data.title}
          </TitleLink>
          {props.showSource && (
            <StyledSource> Source: {props.data.source.name}</StyledSource>
          )}
        </TitleContainer>
      </div>

      {props.children}
      {/* {props.extended && (
      <BorderBottom
        style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)" }}
      />
    )} */}
    </CardContainer>
  );
};

export default Card;
