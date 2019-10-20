import styled, { css } from "styled-components";

export const Button = styled.button`
  font-family: "Roboto Condensed", sans-serif;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: 1s;
  outline: none;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  margin: 0 5px;
  border-radius: 4px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  font-size: 12px;
  ${(props) =>
    props.small &&
    css`
      font-size: 10px;
      padding: 0 12px;
      height: 24px;
    `}
  &:hover {
    background-color: gray;
    color: white;
  }
`;

export const AltButton = styled(Button)`
  background: gray;
  color: white;
  &:hover {
    background: white;
    color: black;
  }
  ${(props) =>
    props.small &&
    css`
      font-size: 10px;
      padding: 0 12px;
      height: 24px;
    `}
  &:hover {
    background-color: white;
    color: black;
  }
`;

export const CarouselButton = styled(Button)`
  display: block;
`;
