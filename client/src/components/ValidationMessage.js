import React from "react";
import styled from "styled-components/macro";

const ErrorMsg = styled.div`
  color: red;
  margin: 5px 0;
`;

const ValidationMessage = props =>
  props.invalid ? <ErrorMsg>{props.message}</ErrorMsg> : null;

export default ValidationMessage;
