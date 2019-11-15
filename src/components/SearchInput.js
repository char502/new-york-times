import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import magGlass2 from "../Images/magGlass2.png";

// ==========================================
const Form = styled.form`
  position: relative;
  width: 250px;
  height: 40px;
  /* background-color: blue; */
`;

const InputWrapper = styled.div`
  position: relative;
  /* overflow: hidden; */
  height: 100%;
  /* background-color: blue; */
`;

const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

const Input = styled.input`
  position: absolute;
  font-family: "Roboto", sans-serif;
  color: black;
  width: 85%;
  left: 20%;
  top: 15%;
  border: none;
  outline: none;
  height: 27px;
  transform: ${(props) =>
    props.isshown ? "translatex(0)" : "translatex(220px)"};
  /* transform property
  translate function */
  /* transition: 5000ms ${easing}; */
  /* transition: 0.5s ease; */
  font-size: ${(props) => (props.isshown ? "12px" : "transparent")};
  background-color: green;
`;

// const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

const StyledIcon = styled.div`
  top: 30%;
  position: absolute;
  transform: ${(props) =>
    props.isshown ? "translatex(15px)" : "translatex(220px)"};
    /* transition: 5000ms ${easing}; */
    /* transition: 0.5s ease; */
  /* left: ${(props) => (props.isshown ? "2%" : "90%")}; */
  cursor: pointer;
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
`;
// ===================================

class SearchInput extends React.Component {
  state = {
    searchTerm: "",
    isshown: false,
    toggleInput: false
  };

  inputRef = React.createRef();

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;

    if (!searchTerm) {
      // if (this.props.location.search === "") {

      this.props.history.push(`/search?searchTerm`.trim());
      // this.setState({ searchTerm: "", toggleInput: false });
    } else {
      this.props.history.push(
        `/search?searchTerm=${this.state.searchTerm}`.trim()
      );
      this.setState({ searchTerm: "", toggleInput: false });
      this.inputRef.current.blur();
    }
  };

  handleToggle = () => {
    this.setState(({ toggleInput }) => ({ toggleInput: !toggleInput }));
    this.inputRef.current.focus();
  };

  render() {
    const { toggleInput } = this.state;
    return (
      <div>
        {/* <div>This is the Search Input Component</div> */}
        <Form onSubmit={this.handleSubmit}>
          <InputWrapper>
            <StyledIcon onClick={this.handleToggle} isshown={toggleInput}>
              <MagGlass src={magGlass2} />
            </StyledIcon>
            <Input
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder={"Enter Search"}
              isshown={toggleInput}
              ref={this.inputRef}
            />
          </InputWrapper>
        </Form>

        {/* <div style={{ color: toggleInput ? "red" : "black" }} /> */}
      </div>
    );
  }
}

export default withRouter(SearchInput);
