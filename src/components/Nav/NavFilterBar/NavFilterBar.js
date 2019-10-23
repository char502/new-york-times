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

// const styles = {
//   clearIndicator: (base) => ({
//     ...base,
//     background: "red"
//   }),
//   control: (base) => ({
//     // ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "8px",
//     color: "black",
//     // background: "blue",
//     height: "24px",
//     width: "150px",
//     padding: "0 16px",
//     borderRadius: "4px",
//     outline: "none",
//     border: "0.5px solid rgba(0, 0, 0, 0.2)",
//     margin: "0 5px",
//     bordeRadius: "4px",
//     position: "relative"
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     // background: "green",
//     width: "20px",
//     height: "24px",
//     padding: 0,
//     position: "absolute",
//     borderRadius: "4px",
//     right: 0,
//     top: 0
//   }),
//   menu: (base) => ({
//     ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "12px",
//     color: "black"
//   })
// };

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
              {/* <Dropdown
                handleChange={this.handleChange}
                filter={this.state.filter}
              /> */}
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
