import React from "react";
import styled from "styled-components/macro";
import { Title } from "../components/Typography";
import { ModH3 } from "../components/Typography";
import moment from "moment";
import imagePlaceholder from "../Images/imagePlaceholder.png";
import { Button } from "../components/Button";

const NewsSourceSecondaryContainer = styled.div`
  max-width: 1200px;
  height: auto;
  margin-right: 40px;
  @media (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    margin-right: 0;
  }
  @media (max-width: 978px) {
    width: 100%;
    margin: 0 auto;
    margin-right: 0;
  }
  @media (max-width: 450px) {
    width: 100%;
    margin: 0 auto;
    margin-right: 0;
  }
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
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const HeadlineImage = styled.img`
  width: 200px;
  margin-right: 24px;
  @media only screen and (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 24px;
    width: 100%;
  }
`;

const LinkContainer = styled.div`
  flex: 3;
  align-self: center;
`;

const LinkContainerInner = styled.div`
  margin-bottom: 2px;
`;

const HeadlineAuthor = styled.p`
  color: lightseagreen;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 12px;
`;

const HeadlinePublished = styled.p`
  font-size: 10px;
  margin: 0;
  padding: 0;
`;

const ButtonContainer = styled.div``;

const NewsSourceContainer = (props) => (
  <NewsSourceSecondaryContainer>
    <Title>{props.title}</Title>
    {props.data.map((newsSourceItem) => (
      <StyledListItem key={props.url}>
        <HeadlineImage
          src={
            newsSourceItem.urlToImage
              ? newsSourceItem.urlToImage
              : imagePlaceholder
          }
        />
        <LinkContainer>
          <LinkContainerInner>
            <ModH3 as="a" href={newsSourceItem.url} target="_blank">
              {newsSourceItem.title}
            </ModH3>
          </LinkContainerInner>
          <HeadlineAuthor>Author: {newsSourceItem.author}</HeadlineAuthor>
          <HeadlinePublished>
            Published: {moment(newsSourceItem.publishedAt).fromNow()}
          </HeadlinePublished>
        </LinkContainer>
        <ButtonContainer>
          <Button small onClick={() => props.handleClick(newsSourceItem)}>
            Save
          </Button>
        </ButtonContainer>
      </StyledListItem>
    ))}
  </NewsSourceSecondaryContainer>
);

export default NewsSourceContainer;
