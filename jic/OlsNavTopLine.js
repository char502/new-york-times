import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import NavHomeButton from "../../../components/NavHomeButton";
import SavedItemsButton from "../../SavedItemsButton";
import SearchInput from "../../SearchInput";

// import magGlass2 from "../../../Images/magGlass2.png";

// ======== Styled Components ========
const NavTopLineContainer = styled.div`
  width: 100%;
  height: 75px;
  /* margin-top: 10px; */
`;

const NavTopLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 24px;
`;

// animated magnifying glass icon
// ==========================================

// const Form = styled.form`
//   position: relative;
//   width: 250px;
//   height: 40px;
//   /* background-color: blue; */
// `;

// const InputWrapper = styled.div`
//   position: relative;
//   overflow: hidden;
//   height: 100%;
//   /* background-color: blue; */
// `;

// const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

// const Input = styled.input`
//   position: absolute;
//   font-family: "Roboto", sans-serif;
//   color: black;
//   width: 85%;
//   left: 20%;
//   top: 15%;
//   border: none;
//   outline: none;
//   height: 27px;
//   transform: ${(props) =>
//     props.isshown ? "translatex(0)" : "translatex(220px)"};
//   /* transform property
//   translate function */
//   /* transition: 5000ms ${easing}; */
//   /* transition: 0.5s ease; */
//   font-size: ${(props) => (props.isshown ? "12px" : "transparent")};
//   /* background-color: green; */
//    /* &:invalid {
//     background-color: pink;
//   } */
//   &:form:invalid{
//     background-color: pink;
//   }

// `;

// const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

// const StyledIcon = styled.div`
//   top: 30%;
//   position: absolute;
//   transform: ${(props) =>
//     props.isshown ? "translatex(15px)" : "translatex(220px)"};
//     /* transition: 5000ms ${easing}; */
//     /* transition: 0.5s ease; */
//   /* left: ${(props) => (props.isshown ? "2%" : "90%")}; */
//   cursor: pointer;
// `;

// const MagGlass = styled.img`
//   width: 20px;
//   height: 20px;
// `;

// ===================================

class NavTopLine extends React.Component {
  state = {
    searchTerm: "",
    isshown: false,
    toggleInput: false
  };

  // use this to target and manage focus on the search box
  // after the click animation exposes it
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
    // const { toggleInput } = this.state;
    console.log(this.props.history.location.search);
    return (
      <NavTopLineContainer>
        <NavTopLineContainerInner>
          <NavHomeButton />
          <NavSearchInputsContainer>
            {this.props.location.search === "" ? (
              //==========================
              <SearchInput />
            ) : //===========
            null}
          </NavSearchInputsContainer>
          <SavedItemsButton />
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);

{/* <Form onSubmit={this.handleSubmit}>
  <InputWrapper>
    <StyledIcon
      onClick={this.handleToggle}
      isshown={toggleInput}
      /* disabled={!this.state.formValid} */
    >
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
</Form>; */}
