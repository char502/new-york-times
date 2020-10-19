// import React from "react";
import React, { useState } from "react";
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

const SearchInput = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);

  const inputRef = React.createRef();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm) {
      props.history.push(`/search?searchTerm`);
      console.log(props.history);
    } else {
      props.history.push(`/search?searchTerm=${searchTerm}`.trim());
      setSearchTerm(searchTerm);
      setSearchToggle({ searchToggle: false });
      inputRef.current.blur();
    }
  };

  const handleToggle = () => {
    setSearchToggle(!searchToggle);
    inputRef.current.focus();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <StyledIcon onClick={handleToggle} isshown={searchToggle}>
            <MagGlass src={magGlass2} />
          </StyledIcon>
          <Input
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleChange}
            placeholder={"Enter Search"}
            isshown={searchToggle}
            ref={inputRef}
          />
        </InputWrapper>
      </Form>
    </FormContainer>
  );
};

export default withRouter(SearchInput);
