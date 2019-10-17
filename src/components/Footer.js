import React from "react";
import styled from "styled-components/macro";
import copyright from "../Images/copyright3.png";

// ======== Styled Components ========

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
    <div>
      <CopyrightImage>
        <Copyright src={copyright} /> <p>Charlotte Ellwood 2019</p>
      </CopyrightImage>
    </div>
  );
};

export default Footer;
