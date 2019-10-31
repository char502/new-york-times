import React from "react";
import styled, { css } from "styled-components/macro";
import { Title } from "../components/Typography";
import { H1, H3, ModH3 } from "../components/Typography";
import moment from "moment";
import imagePlaceholder from "../Images/imagePlaceholder.png";
import { Button } from "../components/Button";

const NewsSourceSecondContainer = styled.div`
  max-width: 1200px;
  height: auto;
  /* padding: 5px 0 10px 0; */
  margin-right: 40px;
  /* border-bottom: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* background-color: lightpink; */
`;

const StyledListItem = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  &:last-child {
    border-width: 0;
    padding-bottom: 50px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const SecondaryHeadlineImage = styled.img`
  height: 80px;
  width: 80px;
`;

const LinkContainer = styled.div`
  flex: 3;
  align-self: center;
`;

const LinkContainerInner = styled.div`
  margin-bottom: 2px;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const SecondaryHeadlineAuthor = styled.p`
  color: lightseagreen;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 12px;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const SecondaryHeadlinePublished = styled.p`
  font-size: 10px;
  /* font-weight: bold; */
  margin: 0;
  padding: 0;
  /* color: grey; */
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const ButtonContainer = styled.div`
  /* justify-content: center;
  align-items: center; */
`;

const NewsSourceContainer = (props) => (
  <NewsSourceSecondContainer>
    <Title>{props.title}</Title>
    {props.data.map((newsSourceItem) => (
      <StyledListItem key={props.url}>
        <ImageContainer>
          <SecondaryHeadlineImage
            src={
              newsSourceItem.urlToImage
                ? newsSourceItem.urlToImage
                : imagePlaceholder
            }
          />
        </ImageContainer>
        <LinkContainer>
          <LinkContainerInner>
            <ModH3 as="a" href={newsSourceItem.url} target="_blank">
              {newsSourceItem.title}
            </ModH3>
          </LinkContainerInner>
          <SecondaryHeadlineAuthor>
            Author: {newsSourceItem.author}
          </SecondaryHeadlineAuthor>
          <SecondaryHeadlinePublished>
            Published: {moment(newsSourceItem.publishedAt).fromNow()}
          </SecondaryHeadlinePublished>
        </LinkContainer>
        <ButtonContainer>
          <Button small onClick={() => props.handleClick(props.data)}>
            Save
          </Button>
        </ButtonContainer>
      </StyledListItem>
    ))}
  </NewsSourceSecondContainer>
);

export default NewsSourceContainer;
