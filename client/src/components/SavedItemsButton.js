import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "./Button";

const ButtonContainer = styled.div`
  margin-right: 12px;
`;

const SavedItemsButton = () => (
  <ButtonContainer>
    <AltButton as={Link} to="/savedNews">
      Saved Items
    </AltButton>
  </ButtonContainer>
);

export default SavedItemsButton;
