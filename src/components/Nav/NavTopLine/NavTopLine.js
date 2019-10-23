import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../../Button";
import newspaper from "../../../Images/newspaper7.jpg";

// Components
import NavFilterBar from "../NavFilterBar/NavFilterBar";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  width: 200px;
  height: 40px;
  background: blue;
`;

const InputWrapper = styled.div`
  position: relative;
  /* Makes Input and StyledIcon relative to their parent 'InputWrapper' */
  /* overflow: hidden; */
  /* in always exist this just hides it when not needed */
  height: 100%;
  margin-right: 20px;
  background: red;
`;

const easing = "cubic-bezier(0.645, 0.045, 0.355, 1)";

const Input = styled.input`
  position: absolute;
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

  /* The transform property applies a 2D or 3D transformation to an element */
  /* translate - repositions an element in the horizontal (x) and/or vertical (Y) directions */
  /* css can't talk directly to state so a property (props) is given to this Input as per lines 83 and 84 below) */
  /* This css property is then linked toggleInput in line 172 */
  /* when isshown(toggleInput) is set to false, this element is moved )  */
  transform: ${(props) =>
    props.isshown ? "translatex(0)" : "translatex(110%)"};

  /* CSS transitions allows you to change property values smoothly, over a given duration. */
  transition: 2s ${easing};
  transition: fill 500ms ease;
  background: green;
  /* transform property
  translate function */
`;

//Magnifying glass icon
const StyledIcon = styled(FontAwesomeIcon)`
  top: 45%;
  width: 10%;
  /* for sizing the icon - but as fnt awsome not sure can size it anyway
  position: absolute;
  /* ====================================================== */
  /* Stuff that makes it move */
  left: ${(props) => (props.isshown ? "unset" : "90%")};

  transition: 2s ${easing};
  transition: fill 500ms ease;
  background: yellow;
`;

// ===================================

const Newspaper = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10%;
`;

const HomeButton = styled.img`
  /* padding-left: 5px; */
  /* display: flex;
  align-items: center;
  position: absolute;
  right: 5px; */
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
                <StyledIcon
                  icon={faSearch}
                  onClick={this.handleToggle}
                  /* isshown={toggleInput} */
                />
                <Input
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder={"Enter Search"}
                  isshown={toggleInput}
                  ref={this.inputRef}
                />
                <div style={{ color: toggleInput ? "red" : "black" }} />
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
