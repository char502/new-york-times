import styled, { css } from "styled-components";

export const Button = styled.button`
  font-family: "Roboto Condensed", sans-serif;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: 1s;
  outline: none;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 30px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  ${(props) =>
    props.small &&
    css`
      font-size: 10px;
      padding: 0 12px;
      height: 24px;
    `}
  ${(props) =>
    props.delete &&
    css`
      color: red;
      font-weight: bold;
    `}
  &:hover {
    background-color: lightGrey;
    color: black;
    font-weight: bold;
  }
`;

export const AltButton = styled(Button)`
  background: lightGrey;
  color: black;
  font-weight: bold;
  height: 28px;
  width: auto;
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

export const SearchAndFilterButton = styled(Button)`
  &:hover {
    background-color: white;
  }
`;

export const CarouselButton = styled(Button)`
  height: 30px;
  width: 50px;
  color: black;
  font-weight: bold;
  transition: 0.2s;
  &:not(:active) {
    background-color: white;
    color: black;
  }
`;
