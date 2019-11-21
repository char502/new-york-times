import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import newspaper from "../Images/newspaper7.jpg";

const Newspaper = styled.img`
  width: 70px;
  height: 70px;
`;

const TitleContainer = styled.div`
  margin: 10px 10px 10px 0;
  flex: 1;
`;

const HomeButton = styled.img`
  margin: 20px 20px 20px 0;
  align-items: center;
`;

const NavHomeButton = () => (
  <TitleContainer>
    <HomeButton as={Link} to="/">
      <Newspaper src={newspaper} />
    </HomeButton>
  </TitleContainer>
);

export default NavHomeButton;
