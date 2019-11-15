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
      this.props.history.push(`/search?searchTerm`.trim());
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
