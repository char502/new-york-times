import React from "react";
// import { withRouter } from "react-router-dom";
// import styled from "styled-components/macro";

class SearchInput extends React.Component {
  render() {
    return (
      <div>
        <div>This is the Search Input Component</div>
        {/* <Form onSubmit={this.handleSubmit}>
                    <InputWrapper>
                        <StyledIcon
                            onClick={this.handleToggle}
                            isshown={toggleInput}

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
                </Form>  */}

        {/* <div style={{ color: toggleInput ? "red" : "black" }} /> */}
      </div>
    );
  }
}

export default SearchInput;
