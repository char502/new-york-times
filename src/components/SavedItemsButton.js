import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../components/Button";

const ButtonContainer = styled.div`
  margin-right: 5px;
`;

const SavedItemsButton = () => (
  <ButtonContainer>
    <AltButton as={Link} to="/savedNews">
      Saved Items
    </AltButton>
  </ButtonContainer>
);

export default SavedItemsButton;
