import React from "react";
import styled from "styled-components/macro";
import copyright from "../Images/copyright3.png";

// ======== Styled Components ========

const FooterContainer = styled.div`
  padding: 30px 10px 10px 10px;
`;

const CopyrightImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 10px;
`;

const Copyright = styled.img`
  width: 15px;
  height: 15px;
  padding-right: 3px;
`;

// ===================================
const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightImage>
        <Copyright src={copyright} /> <p>Charlotte Ellwood 2019</p>
      </CopyrightImage>
    </FooterContainer>
  );
};

export default Footer;
