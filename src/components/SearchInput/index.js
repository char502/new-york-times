import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import magGlass2 from "../../Images/magGlass2.png";

const FormContainer = styled.div`
  max-width: 270px;
  justify-content: center;
`;

const Form = styled.form`
  width: 250px;
  height: 40px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 110%;
`;

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
    props.isshown ? "translatex(-20px)" : "translatex(220px)"};
  font-size: ${(props) => (props.isshown ? "12px" : "transparent")};
  @media (max-width: 978px) {
    margin: 0 auto;
  }
`;

const StyledIcon = styled.div`
  top: 30%;
  position: absolute;
  transform: ${(props) =>
    props.isshown ? "translatex(5px)" : "translatex(220px)"};
  cursor: pointer;
  @media (max-width: 978px) {
    transform: ${(props) =>
      props.isshown ? "translatex(5px)" : "translatex(240px)"};
  }
`;

const MagGlass = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
`;

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
      this.props.history.push(`/search?searchTerm`.trim());
      console.log(this.props.history);
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
      <FormContainer>
        <Form onSubmit={this.handleSubmit}>
          <InputWrapper>
            <StyledIcon onClick={this.handleToggle} isshown={toggleInput}>
              <MagGlass src={magGlass2} />
            </StyledIcon>
            <Input
              type="text"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder={"Enter Search"}
              isshown={toggleInput}
              ref={this.inputRef}
            />
          </InputWrapper>
        </Form>
      </FormContainer>
    );
  }
}

export default withRouter(SearchInput);
