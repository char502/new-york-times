import React from "react";
// import React, { Component } from "react";
// import styled from "styled-components/macro";

const AlertMessage = (props) => (
  <div>
    News Item:
    <p>
      <strong>
        <u>
          <i>{props.details.data.title}</i>
        </u>
      </strong>
    </p>
    {props.messageText}
  </div>
);

export default AlertMessage;
