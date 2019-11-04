import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Select from "react-select";
import newsSources from "../../../newsSources";

// ======== Styled Components ========
const NavFilterBarContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: MediumSeaGreen;
`;

const NavFilterBarContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

// const FormButtons = styled.input`
//   margin: 10px 10px;
// `;
// ===================================

class SearchAndFilter extends React.Component {
  render() {
    return this.props.location.pathname === "/search" ? (
      <NavFilterBarContainer>
        <NavFilterBarContainerInner>
          <p>This is the search and filter div</p>
          {/* <form onSubmit={this.handleSubmit}>
                        <label>
                            Filter by news source
                                <Select
                                options={newsSources}
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option.path}`}
                                onChange={this.handleChange}
                                placeholder={"Select Source"}
                                value={newsSources.filter(
                                    ({ path }) => path === this.state.filter
                                )}
                            />
                        </label>
                        {this.state.filter && <FormButtons type="submit" value="Submit" />}
                        {this.state.filter && (
                            <FormButtons
                                type="button"
                                value="Clear Filter"
                                onClick={this.handleClearFilter}
                            />
                        )}
                    </form> */}
        </NavFilterBarContainerInner>
      </NavFilterBarContainer>
    ) : null;
  }
}

export default withRouter(SearchAndFilter);
