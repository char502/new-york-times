import styled, { css } from "styled-components";

export const H1 = styled.h1`
  font-family: "Vidaloka", serif;
  font-size: 42px;
  color: black;
  margin: 0;
  /* margin-bottom: 32px; */
`;

export const H2 = styled.h2`
  font-family: "Vidaloka", serif;
  font-size: 32px;
  color: black;
  margin: 0;
  /* margin-bottom: 32px; */
`;

export const H3 = styled.h3`
  font-size: 24px;
  color: black;
  text-decoration: none;
`;

export const ModH3 = styled(H3)`
  font-size: 20px;
  color: black;
  text-decoration: none;
`;

export const H4 = styled.h4`
  font-size: 14px;
  color: black;
  text-decoration: none;
  margin: 0;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

export const H5 = styled.h5`
  padding: 0;
  font-size: 12px;
  color: black;
  text-decoration: none;
`;

export const Title = styled(H1)`
  font-size: 32px;
  margin: 28px;
  /* padding: 20px 0 0 250px; */
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;
