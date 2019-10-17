import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { AltButton } from "../../Button";
// import { H1 } from "../../Typography";
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
  margin-top: 10px;
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
  width: 200px;
  height: 40px;
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  margin-right: 30px;
`;

const easing = "cubic-bezier(0.645, 0.045, 0.355, 1)";

const Input = styled.input`
  position: absolute;
  width: 85%;
  left: 15%;
  top: 30%;
  border: none;
  outline: none;
  height: 27px;
  transform: ${(props) => (props.show ? "translatex(0)" : "translatex(110%)")};
  transition: 2s ${easing};
  transition: fill 500ms ease;
  /* transform property
  translate function */
`;

//Magnifying glass icon
const StyledIcon = styled(FontAwesomeIcon)`
  top: 45%;
  width: 10%;
  position: absolute;
  left: ${(props) => (props.show ? false : "90%")};
  transition: 2s ${easing};
  transition: fill 500ms ease;
`;

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
