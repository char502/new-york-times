import React from "react";
import { withRouter, Redirect } from "react-router-dom";
// import { getSearchNews } from "../../../utils/api";

// SearchResultsComponent
import SearchResults from "./SearchResults";

// import styled from "styled-components";
import styled from "styled-components/macro";

// class Monkey extends React.Component {
//   render() {
//     return <div>{this.props.isSmart ? "Smart Monkey" : "Monkey"}</div>;
//   }
// }

// function withBrain(Mammal) {
//   return class extends React.Component {
//     state = {
//       isSmart: false
//     };
//     render() {
//       return <Mammal {...this.state} />;
//     }
//   };
// }

// ======== Styled Components ========
const NavTopLineContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: red;
`;

const NavTopLineContainerInner = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
// const SectionsButton = styled.div`
//     width: 73;
//     height: 22;
//     background-color: yellow
// `
// ===================================

class NavTopLine extends React.Component {
  state = {
    searchTerm: "",
    results: []
  };

  handleChange = (e) => this.setState({ searchTerm: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search?searchTerm=${this.state.searchTerm}`);
    console.log(this.props);
    // const response = await getSearchNews();
    // this.setState({ loading: true });
    // const news = await getSearchNews(this.state.searchTerm);
    // console.log(news);
    // this.setState({ loading: false, results: news.data.articles });
    // console.log(this.state.results);
    this.setState({ searchTerm: "" });
  };

  render() {
    // const SmartMonkey = withBrain(Monkey);
    return (
      <NavTopLineContainer>
        <NavTopLineContainerInner>
          <h1>This is Nav Top Line</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.searchTerm} onChange={this.handleChange} />
          </form>
          {/* <Monkey /> */}
          {/* <SmartMonkey /> */}
        </NavTopLineContainerInner>
      </NavTopLineContainer>
    );
  }
}

export default withRouter(NavTopLine);
