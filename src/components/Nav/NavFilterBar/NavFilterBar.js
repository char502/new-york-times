import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
import Select from "react-select";
import newsSources from "../../../newsSources";
import { Button } from "../../Button";

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

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  })
};

// const select = styled.select`
//   /* font-family: "Roboto Condensed", sans-serif;
//   background-color: Transparent;
//   border: none;
//   cursor: pointer;
//   overflow: hidden;
//   outline: none; */
//   background-color: blue;
// `;

// const FormButtons = styled.input`
//   margin: 10px 10px;
// `;
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
              <Select
                options={newsSources}
                /* isClearable */
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => `${option.path}`}
                onChange={this.handleChange}
                placeholder={"Select by filter source"}
                styles={styles}
                clearValue={() => true}
                value={newsSources.filter(
                  ({ path }) => path === this.state.filter
                )}
              />
            </div>

            <Button onClick={this.handleSubmit}>Submit</Button>

            <Button onClick={this.handleClearFilter}>Clear Filter</Button>
          </ActionContainer>
        </Inner>
      </Container>
    );
  }
}

export default withRouter(NavFilterBar);
