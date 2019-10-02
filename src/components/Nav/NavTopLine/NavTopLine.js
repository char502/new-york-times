import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";

// Components
import NavFilterBar from "../NavFilterBar/NavFilterBar";

// ======== Styled Components ========
const NavTopLineContainer = styled.div`
  width: 100%;
  height: 75px;
  background-color: red;
`;

const NavTopLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const NavSearchInputsContainer = styled.div`
  /* height: 50%;
  width: 50%; */
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

// const NavFilterBarContainer = styled.div`
//   /* height: 50%;
//   width: 50%; */
//   flex: 2;
// `;

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
          <TitleContainer>
            <h4>This is Nav Top Line</h4>
          </TitleContainer>
          <NavSearchInputsContainer>
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.searchTerm}
                onChange={this.handleChange}
                placeholder={"Enter Search"}
              />
            </form>
            <NavFilterBar />
          </NavSearchInputsContainer>
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);
