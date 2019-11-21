import React from "react";
import styled from "styled-components/macro";
import { H4, H5 } from "../components/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const FooterContainer = styled.div`
  width: 100vw;
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  background-color: lightgray;
  position: relative;
`;

const StyledHeader = styled.div`
  padding-bottom: 15px;
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
        <StyledHeader>
          <H4>Contact Me:</H4>
        </StyledHeader>
        <SocialMedia>
          <SocialMediaLink
            as="a"
            href="http://www.linkedin.com/in/charlotte-ellwood-9132313"
            target="_blank"
          >
            <StyledIcon icon={faLinkedin} />
          </SocialMediaLink>
          <SocialMediaLink
            as="a"
            href="mailto:char502@hotmail.com"
            target="_blank"
          >
            <StyledIcon icon={faEnvelope} />
          </SocialMediaLink>
          <SocialMediaLink
            as="a"
            href="https://github.com/char502/new-york-times"
            target="_blank"
          >
            <StyledIcon icon={faGithubSquare} />
          </SocialMediaLink>
        </SocialMedia>
      </ContactMe>

      <MadeBy>
        <H5>
          Made with{" "}
          <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
            {"❤️"}
          </span>{" "}
          by Charlotte Ellwood - 2019
        </H5>
      </MadeBy>
    </FooterContainer>
  );
};

export default Footer;
