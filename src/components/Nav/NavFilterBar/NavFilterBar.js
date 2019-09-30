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

const FormButtons = styled.input`
  margin: 10px 10px;
`;
// ===================================

class NavFilterBar extends React.Component {
  state = {
    filter: ""
  };

  handleChange = (val) => {
    this.setState({ filter: val.path });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = queryString.parse(this.props.location.search);
    searchQuery.sources = this.state.filter;
    const stringifiedSearchQuery = queryString.stringify(searchQuery);
    console.log(stringifiedSearchQuery);
    this.props.history.push(`?${stringifiedSearchQuery}`);

    this.setState({ filter: "" });
  };

  handleClearFilter = (e) => {
    e.preventDefault();
    let searchQuery = queryString.parse(this.props.location.search);
    if (searchQuery.sources) {
      delete searchQuery.sources;
      this.setState({ filter: "" });
      const filterKeyRemovedQuery = queryString.stringify(searchQuery);
      this.props.history.push(`?${filterKeyRemovedQuery}`);
    }
  };

  componentDidMount() {
    let searchQuery = queryString.parse(this.props.location.search);
    if (searchQuery.sources) {
      this.setState({ filter: searchQuery.sources });
    }
  }

  componentDidUpdate(prevProps) {
    //Used here because want something to happen after the state is updated?
    if (prevProps.location.search !== this.props.location.search) {
      let searchQuery = queryString.parse(this.props.location.search);
      this.setState({ filter: searchQuery.sources });
    }
  }

  render() {
    return this.props.location.pathname === "/search" ? (
      <NavFilterBarContainer>
        <NavFilterBarContainerInner>
          <form onSubmit={this.handleSubmit}>
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
          </form>
        </NavFilterBarContainerInner>
      </NavFilterBarContainer>
    ) : null;
  }
}

export default withRouter(NavFilterBar);
