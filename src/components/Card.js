import React, {useState, useEffect} from "react";
import styled, { css } from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { TitleLink } from "./Typography";
import imagePlaceholder from "../Images/imagePlaceholder.png";

const CardContainer = styled.div`
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
  padding-bottom: 10px;
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
  const [showNotification, setShowNotification] = useState(false);


  const handleItemAction = () => {
    setShowNotification(true);
    props.handleClick(props.data);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000)
  }




  return (
    <React.Fragment>
      {showNotification &&
        <div style={{width: 300, height: 75, position: "fixed", top: 0, left: 0, background: 'red', zIndex: 999}} >

        </div>
      }
      <CardContainer padded={props.extended}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <StyledAuthor>Author: {props.data.author}</StyledAuthor>
            <StyledPublished>
              Published: {moment(props.data.publishedAt).fromNow()}
            </StyledPublished>
          </div>
          <ActionButton>
            <Button small onClick={handleItemAction}>
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
      </CardContainer>
    </React.Fragment>
    
  );
};

export default Card;
