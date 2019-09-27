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
// ===================================

class NavFilterBar extends React.Component {
  state = {
    filter: ""
  };

  handleChange = (val) => {
    console.log(val);
    this.setState({ filter: val.path });
    // console.log(this.state.filter);
    console.log(val.path);
    console.log(this.state.filter);
    // console.log(e.target.value);
    let searchQuery = queryString.parse(this.props.location.search);
    console.log(searchQuery);
    searchQuery.sources = this.state.filter;
    console.log(searchQuery.sources);
    const stringifiedSearchQuery = queryString.stringify(searchQuery);
    console.log(stringifiedSearchQuery);
    this.props.history.push(`search/?${stringifiedSearchQuery}`);
  };

  // handleSubmit = (e) => {
  //   // e.preventDefault();
  //   let searchQuery = queryString.parse(this.props.location.search);
  //   console.log(searchQuery);
  //   searchQuery.sources = this.state.filter;
  //   const stringifiedSearchQuery = queryString.stringify(searchQuery);
  //   this.props.history.push(`search/?${stringifiedSearchQuery}`);

  //   // this.setState({ filter: "" });
  // };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.searchterm !== this.props.searchterm && this.props.source) {
  //     this.setState({ filter: "" });
  //   }
  // }

  // displayNewsOptions = () => {
  //   return newsSources.map((item) => (
  //     <option key={item.name} value={item.path}>
  //       {item.name}
  //     </option>
  //   ));
  // };

  // theSelectComponent = () => {
  //   let currentValue = this.state.filter || "DEFAULT";
  //   return (
  //     <select value={currentValue} onChange={this.handleChange}>
  //       <option value="DEFAULT" disabled>
  //         Select Source
  //       </option>
  //       {this.displayNewsOptions()}
  //     </select>
  //   );
  // };

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <NavFilterBarContainer>
        <NavFilterBarContainerInner>
          <form onSubmit={this.handleSubmit}>
            {/* <label>Filter by news source: {this.theSelectComponent()}</label> */}
            <label>
              Filter by news source
              <Select
                options={newsSources}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => `${option.path}`}
                onChange={this.handleChange}
                /* onSubmit={this.handleSubmit} */
                /* isOptionSelected={(option) => {
                  return this.state.filter === option.name ? true : false;
                }} */
                placeholder={"Select Source"}
              />
            </label>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        </NavFilterBarContainerInner>
      </NavFilterBarContainer>
    );
  }
}

export default withRouter(NavFilterBar);
