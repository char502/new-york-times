import React from "react";

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
//test

export default AlertMessage;
