import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

// Components
import NavFilterBar from "../NavFilterBar/NavFilterBar";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  margin: 5px;
  border-radius: 4px;
  background-color: lightgray;
  padding: 5px 10px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  background-color: forestgreen;
`;

// const FormContainer = styled.div`
//   width: 200px;
//   height: 30px;
//   p
// `;

const Form = styled.form`
  position: relative;
  width: 200px;
  height: 40px;
  background-color: red;
`;

const Input = styled.input`
  position: relative;
  width: 180px;
  background: yellow;
  border: none;
  height: 27px;
`;

const InputButton = styled.button`
  background: blue;
  border-radius: 50px;
  height: 30px;
  width: 30px;
  top: 5px;
  right: 20px;
  border: none;
  position: absolute;
  right: 0;
  /* &:active {
    background: seagreen;
  } */
  &:focus {
    background: seagreen;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  /* position: absolute;
  right: 7px;
  bottom: 7px; */
  /* background: blue; */
  /* border-radius: 50px; */
  /* position: absolute; */
`;
// const NavFilterBarContainer = styled.div`
//   /* height: 50%;
//   width: 50%; */
//   flex: 2;
// `;

// ===================================

class NavTopLine extends React.Component {
  state = {
    searchTerm: "",
    show: false,
    toggleInput: false
  };

  handleChange = (e) => this.setState({ searchTerm: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);

    this.setState({ searchTerm: "" });
  };

  // handleToggleInput = () => {
  //   const { toggleInput, searchTerm } = this.state;

  //   console.log("handleToggleInput clicked");

  //   if (searchTerm) {
  //     this.setState({
  //       toggleInput: !toggleInput
  //     });
  //   }
  // };

  render() {
    const { toggleInput } = this.state;
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
            {/* <FormContainer> */}
            <Form onSubmit={this.handleSubmit}>
              <InputButton
                onClick={() => this.setState({ toggleInput: !toggleInput })}
              >
                <StyledIcon icon={faSearch} />
                {toggleInput ? (
                  <Input
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    placeholder={"Enter Search"}
                  />
                ) : null}
              </InputButton>
            </Form>
            {/* </FormContainer> */}
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
