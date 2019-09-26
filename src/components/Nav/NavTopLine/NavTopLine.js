import React from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components/macro";

// ======== Styled Components ========
const NavTopLineContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: red;
`;

const NavTopLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

// ===================================

class NavTopLine extends React.Component {
  state = {
    searchTerm: ""
  };

  handleChange = (e) => this.setState({ searchTerm: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);

    this.setState({ searchTerm: "" });
  };

  render() {
    return (
      <NavTopLineContainer>
        <NavTopLineContainerInner>
          <h1>This is Nav Top Line</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.searchTerm} onChange={this.handleChange} />
          </form>
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);
