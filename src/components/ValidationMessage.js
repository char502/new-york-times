import React from "react";
import styled from "styled-components/macro";

const ErrorMsg = styled.div`
  color: red;
  margin: 5px 0;
`;

const ValidationMessage = (props) => {
  if (!props.valid) {
    return <ErrorMsg>{props.message}</ErrorMsg>;
  }
  return null;
};

export default ValidationMessage;
