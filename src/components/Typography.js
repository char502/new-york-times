import styled, { css } from "styled-components";

export const H1 = styled.h1`
  font-family: "Vidaloka", serif;
  font-size: 42px;
  color: black;
  margin: 0;
`;

export const H2 = styled.h2`
  font-family: "Vidaloka", serif;
  font-size: 32px;
  color: black;
  margin: 0;
`;

export const H3 = styled.h3`
  font-size: 24px;
  color: black;
  text-decoration: none;
`;

export const TitleLink = styled.a`
  font-size: 24px;
  color: black;
  text-decoration: none;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 12px;
    background: rgba(75, 223, 189, 0.4);
    bottom: 0px;
    z-index: -1;
  }
  @media (max-width: 978px) {
    font-size: 24px;
  }
`;

export const ModH3 = styled(H3)`
  color: black;
  text-decoration: none;
`;

export const H4 = styled.h4`
  font-size: 14px;
  text-decoration: none;
  margin: 0;
  color: ${props => (props.color ? props.color : "black")};

  @media (max-width: 978px) {
    font-size: 12px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex: wrap;
  }
`;

export const H5 = styled.h5`
  padding: 0;
  font-size: 12px;
  color: black;
  text-decoration: none;
`;

export const Title = styled(H1)`
  font-size: 32px;
  margin-top: 24px;
  margin-bottom: 32px;
  ${props =>
    props.right &&
    css`
      text-align: right;
    `}
`;
