import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../../Button";

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
  /* background-color: forestgreen; */
`;

// const FormContainer = styled.div`
//   width: 200px;
//   height: 30px;
//   p
// `;

// animated magnifying glass icon
// ==========================================

const Form = styled.form`
  position: relative;
  width: 200px;
  height: 40px;
  /* background-color: red; */
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  /* background-color: blue; */
`;

// const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

const easing = "cubic-bezier(0.645, 0.045, 0.355, 1)";

// const easeOut = "cubic-bezier(0.2, 0, 0.2, 1)";

// const easeIn = "cubic-bezier(0.1, 0.12, 0.25, 1)";
// cubic - bezier(.1, .12, .25, 1)}.hk{ transition: fill 200ms ease }

const Input = styled.input`
  /* background-color: yellow; */
  position: absolute;
  width: 85%;
  left: 10%;
  top: 15%;
  border: none;
  outline: none;
  height: 27px;
  transform: ${(props) => (props.show ? "translatex(0)" : "translatex(110%)")};
  transition: 2s ${easing};
  /* transition: opacity 0.3s; */
  transition: fill 500ms ease;
  /* transform property
  translate function */
`;

const StyledIcon = styled(FontAwesomeIcon)`
  /* background-color: forestgreen; */
  top: 30%;
  width: 10%;
  position: absolute;
  left: ${(props) => (props.show ? "0" : "90%")};
  transition: 2s ${easing};
  /* transition: opacity 0.3s; */
  transition: fill 500ms ease;
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

  // use this to target and manage focus on the search box
  // after the click animation exposes it
  inputRef = React.createRef();

  handleChange = (e) => this.setState({ searchTerm: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);

    this.setState({ searchTerm: "" });
  };

  handleToggle = () => {
    this.setState(({ toggleInput }) => ({ toggleInput: !toggleInput }));
    this.inputRef.current.focus();
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
            {/* ///////////////////// */}
            <Form onSubmit={this.handleSubmit}>
              <InputWrapper>
                <StyledIcon
                  icon={faSearch}
                  onClick={this.handleToggle}
                  show={toggleInput}
                />
                <Input
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder={"Enter Search"}
                  show={toggleInput}
                  ref={this.inputRef}
                />
                {/* <div style={{ color: toggleInput ? "red" : "black" }} /> */}
              </InputWrapper>
            </Form>
            {/* ///////////////////// */}
            <NavFilterBar />
          </NavSearchInputsContainer>

          <AltButton as={Link} to="/savedNews">
            Saved Items
          </AltButton>
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);
