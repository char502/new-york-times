import React from "react";
// import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../components/Button";

const SavedItemsButton = () => (
  <div style={{ marginRight: "5px" }}>
    <AltButton as={Link} to="/savedNews">
      Saved Items
    </AltButton>
  </div>
);

export default SavedItemsButton;
