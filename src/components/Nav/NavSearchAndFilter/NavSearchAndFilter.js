import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import Dropdown from "../../Dropdown";
import { SearchAndFilterButton } from "../../Button";
import { H2 } from "../../Typography";
import magGlass2 from "../../../Images/magGlass2.png";
import ValidationMessage from "../../ValidationMessage";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: WhiteSmoke;
`;

const StyledTitle = styled.div`
  margin: 20px 0 0 10px;
  padding: 10px 0;
  font-family: "Vidaloka", serif;
`;

const FilterAndSearchContainer = styled.div`
  margin: 10px;
  text-align: center;
`;

const Inner = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledInput = styled.input`
  height: 28px;
  width: 350px;
  padding-left: 25px;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 0;
  border-left: 0;
  outline: none;
`;

const StyledIcon = styled.div`
  height: 32px;
  width: 30px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 0;
  border-radius: 0;
`;

const MagGlass = styled.img`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 4px;
  outline: none;
`;

class NavSearchAndFilter extends React.Component {
  render() {
    return this.props.location.pathname === "/search" ? (
      <MainContainer>
        <StyledTitle>
          <H2>Search and Filter Options</H2>
        </StyledTitle>
        <Inner onSubmit={this.props.handleSubmit}>
          <FilterAndSearchContainer>
            <div style={{ display: "flex" }}>
              <Dropdown
                handleChange={this.props.handleFilterChange}
                filter={this.props.filter}
              />
              <StyledInput
                type="text"
                name="searchTerm"
                value={this.props.searchTerm}
                onChange={this.props.handleInputchange}
                placeholder="Enter Search......"
                autoFocus
              />
              <StyledIcon
                as={SearchAndFilterButton}
                onClick={this.props.handleSubmit}
                disabled={this.props.searchTermError}
              >
                <MagGlass src={magGlass2} />
              </StyledIcon>
            </div>
            <div>
              <ValidationMessage
                invalid={this.props.searchTermError}
                message={this.props.errorMsg.searchTerm}
              />
            </div>
          </FilterAndSearchContainer>
        </Inner>
      </MainContainer>
    ) : null;
  }
}

export default withRouter(NavSearchAndFilter);
