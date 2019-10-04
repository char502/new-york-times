import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

// Components
import NavFilterBar from "../NavFilterBar/NavFilterBar";

// ======== Styled Components ========
const NavTopLineContainer = styled.div`
  width: 100%;
  height: 75px;
  /* background-color: red; */
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

const StyledButton = styled.button`
  font-family: "Playfair Display", serif;
  background-color: Transparent;
  border: none;
  cursor: pointer;
  /* overflow: hidden; */
  outline: none;
`;

const SavedItemsStyledButton = styled.button`
  font-family: "Roboto Condensed", sans-serif;
  background-color: Transparent;
  display: flex;
  border: 0.5px solid black;
  /* outline: none; */
  margin: 5px;
  border-radius: 5px;
  background-color: lightgray;
  padding: 5px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
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
            <StyledButton>
              <h1>
                <StyledLink to="/">Favourite News App</StyledLink>
              </h1>
            </StyledButton>
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
          <SavedItemsStyledButton>
            <StyledLink to="/savedNews">Saved Items</StyledLink>
          </SavedItemsStyledButton>
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);
