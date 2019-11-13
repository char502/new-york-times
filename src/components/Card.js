import React from "react";
import styled, { css } from "styled-components/macro";
import moment from "moment";
import { Button } from "./Button";
import { H4, TitleLink } from "./Typography";
import imagePlaceholder from "../Images/imagePlaceholder.png";

// const CardOuter = styled.div`
//   /* padding: 10px;
//   margin: 30px; */
// `;

const CardContainer = styled.div`
  /* padding: 5px; */
  width: 600px;
  min-height: 450px;
  margin: auto;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* background: lightsteelblue; */
  padding: 10px 0 20px 0;
  ${props => {
    return (
      props.padded &&
      css`
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
        padding: 15px;
      `
    );
  }}
`;

const ImageAndTitle = styled.div`
  padding: 5px;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 350px;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  display: block;
  margin: auto;
  align-items: center;
`;

const TitleContainer = styled.div`
  padding: 20px 10px 10px 10px;
  text-align: center;
  font-weight: bold;
`;

const StyledSource = styled.div`
  color: darkgray;
  padding: 5px;
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

// const BorderBottom = styled.div`
//   padding: 15px;
// `;

// { item, handleAction, text, extended, author, publishedAt }

const Card = props => {
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
      <ImageAndTitle>
        <ImgContainer
          src={props.data.urlToImage ? props.data.urlToImage : imagePlaceholder}
        />
        <TitleContainer>
          <TitleLink href={props.data.url} target="_blank">
            {props.data.title}
          </TitleLink>
          {props.showSource && (
            <H4>
              <StyledSource> Source: {props.data.source.name}</StyledSource>
            </H4>
          )}
        </TitleContainer>
      </ImageAndTitle>

      {props.children}
      {/* {props.extended && (
      <BorderBottom
        style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)" }}
      />
    )} */}
    </CardContainer>
  );
};

// const Card = props => (
//   <CardContainer padded={props.extended}>
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1 }}>
//         <StyledAuthor>Author: {props.data.author}</StyledAuthor>
//         <StyledPublished>
//           Published: {moment(props.data.publishedAt).fromNow()}
//         </StyledPublished>
//       </div>
//       <ActionButton>
//         <Button small onClick={() => props.handleClick(props.data)}>
//           {props.text}
//         </Button>
//       </ActionButton>
//     </div>
//     <ImageAndTitle>
//       <ImgContainer
//         src={props.data.urlToImage ? props.data.urlToImage : imagePlaceholder}
//       />

//       <TitleContainer>
//         <TitleLink href={props.data.url} target="_blank">
//           {props.data.title}
//         </TitleLink>
//         {props.showSource && (
//           <H4>
//             <StyledSource>Source: {props.data.source.name}</StyledSource>
//           </H4>
//         )}
//       </TitleContainer>
//     </ImageAndTitle>

//     {props.children}
//     {/* {props.extended && (
//       <BorderBottom
//         style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)" }}
//       />
//     )} */}
//   </CardContainer>
// );

export default Card;
