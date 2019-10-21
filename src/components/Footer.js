import React from "react";
import styled from "styled-components/macro";
// import copyright from "../Images/copyright3.png";
import { H4, H5 } from "../components/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

// ======== Styled Components ========

const FooterContainer = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  background-color: whitesmoke;
`;

const SocialMedia = styled.div`
  display: flex;
`;

const SocialMediaLink = styled.img`
  color: black;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  padding: 0 20px;
`;

const ContactMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 40px 10px;
`;

const MadeBy = styled.div`
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
`;

// ===================================
const Footer = () => {
  return (
    <FooterContainer>
      <ContactMe>
        <H4>Contact Me:</H4>
        <SocialMedia>
          <SocialMediaLink
            as="a"
            href="http://www.linkedin.com/in/charlotte-ellwood-9132313"
          >
            <StyledIcon icon={faLinkedin} />
          </SocialMediaLink>
          <SocialMediaLink as="a" href="mailto:char502@hotmail.com">
            <StyledIcon icon={faEnvelope} />
          </SocialMediaLink>
          <SocialMediaLink
            as="a"
            href="https://github.com/char502/new-york-times"
          >
            <StyledIcon icon={faGithubSquare} />
          </SocialMediaLink>
        </SocialMedia>
      </ContactMe>

      <MadeBy>
        <H5>
          Made with{" "}
          <span role="img" aria="heart icon">
            ❤️
          </span>{" "}
          by Charlotte Ellwood 2019
        </H5>
      </MadeBy>
    </FooterContainer>
  );
};

export default Footer;
