import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../../Button";
import newspaper from "../../../Images/newspaper7.jpg";

import magGlass2 from "../../../Images/magGlass2.png";

// Components
import NavFilterBar from "../NavFilterBar/NavFilterBar";

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

const TitleContainer = styled.div`
  flex: 1;
`;

const NavSearchInputsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

// animated magnifying glass icon
// ==========================================

const Form = styled.form`
  position: relative;
  /* Makes InputWrapper relative to it parent 'Form' */
  width: 250px;
  height: 40px;
  /* background: blue; */
`;

const InputWrapper = styled.div`
  position: relative;
  /* Makes Input and StyledIcon relative to their parent 'InputWrapper' */
  overflow: hidden;
  /* it always exists this just hides it when not needed */
  height: 100%;
  /* margin-right: 10px; */
  /* background: red; */
`;

const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

const Input = styled.input`
  /* background: green; */
  position: absolute;
  /* An element with position: absolute; is positioned relative to the nearest positioned ancestor */
  font-family: "Roboto", sans-serif;
  /* the input defaults to arial so this is to override that */
  color: black;
  /* the colour of the search text */
  
  width: 85%;
  /* green box 85% of the width of it's parent */
  left: 15%;
  /* 15% away from the left of it's normal position */
  top: 30%;
  /* 30% away from the top of it's notmal position */
  border: none;
  outline: none;
  height: 27px;
  /* ====================================================== */

  /* Stuff that makes it move */
  transform: ${(props) =>
    props.isshown ? "translatex(0)" : "translatex(205px)"};

  /* The transform property applies a 2D or 3D transformation to an element */
  /* translate - repositions an element in the horizontal (x) and/or vertical (Y) directions */
  /* css can't talk directly to state so a property (props) is given to this Input as per lines 83 and 84 below) */
  /* This css property is then linked to toggleInput in line 172 */
  /* when isshown(toggleInput) is set to false, this element is positioned 110% to the right of the input box (a minus number i.e. -110% would start it on the left))  */
  
  /* CSS transitions allows you to change property values smoothly, over a given duration. */
  /* transition: 2s ${easing}; */
  
  /* transform property
  translate function */

  font-size:  ${(props) => (props.isshown ? "12px" : "transparent")};
   
`;

// const easing = "cubic-bezier(0.77, 0, 0.175, 1)";

const StyledIcon = styled.div`
  top: 45%;
  position: absolute;
  transform: ${(props) =>
    props.isshown ? "translatex(0)" : "translatex(205px)"};
  /* left: ${(props) => (props.isshown ? "2%" : "90%")}; */
  
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
`;

// ===================================

const Newspaper = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10%;
`;

const HomeButton = styled.img`
  align-items: center;
`;

class NavTopLine extends React.Component {
  state = {
    searchTerm: "",
    isshown: false,
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
    // When the reference is created using React.creatRef() (with React 16 syntax) you can then access it using the 'current' property
  };

  render() {
    const { toggleInput } = this.state;
    return (
      <NavTopLineContainer>
        <NavTopLineContainerInner>
          <TitleContainer>
            <HomeButton as={Link} to="/">
              <Newspaper src={newspaper} />
            </HomeButton>
          </TitleContainer>
          <NavSearchInputsContainer>
            {/* ======================================== */}
            <Form onSubmit={this.handleSubmit}>
              <InputWrapper>
                {/* =============== */}
                <StyledIcon onClick={this.handleToggle} isshown={toggleInput}>
                  <MagGlass src={magGlass2} />
                </StyledIcon>
                {/* =============== */}
                <Input
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder={"Enter Search"}
                  isshown={toggleInput}
                  ref={this.inputRef}
                  /* there are a few cases where you need to modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component,for this case, React provides an escape hatch. */
                  /* There are a few good use cases for refs:
                          Managing focus, text selection, or media playback. */
                  /* This prop targets the ref on the 'Input' component */
                  /*  The' handleToggle' function then uses 'this.inputRef.current.focus();' to put focus on that component */
                />
                {/* <div style={{ color: toggleInput ? "red" : "black" }} /> */}
              </InputWrapper>
            </Form>
            {/* ==================================================== */}
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
