import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import { Button } from "../../Button";
import Dropdown from "../../Dropdown";

// ======== Styled Components ========
const Container = styled.div`
  height: 100%;
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ActionContainer = styled.div`
  background-color: transparent;
  display: flex;
  margin: 5px;
  border-radius: 4px;
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

  // this.props.location.pathname === "/search" ?
  render() {
    return (
      <Container>
        <Inner onSubmit={this.handleSubmit}>
          <ActionContainer>
            <div style={{ width: "220px" }}>
              <Dropdown
                handleChange={this.handleChange}
                filter={this.state.filter}
              />
            </div>

            <Button style={{ marginLeft: "5px" }} onClick={this.handleSubmit}>
              Submit
            </Button>

            <Button
              style={{ margin: "0", marginLeft: "5px" }}
              onClick={this.handleClearFilter}
            >
              Clear Filter
            </Button>
          </ActionContainer>
        </Inner>
      </Container>
    );
  }
}

export default withRouter(NavFilterBar);
