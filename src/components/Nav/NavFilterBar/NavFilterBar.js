import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components/macro";
// import queryString from "query-string";
import newsSources from "../../../newsSources";
import { getSearchNews } from "../../../utils/api";

// ======== Styled Components ========
const NavFilterBarContainer = styled.div`
  width: 100%;
  height: 30px;
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
    filter: "",
    newsURL: "",
    results: [],
    filteredResults: []
  };

  handleChange = (e) => {
    this.setState({ filter: e.target.value });
    console.log(this.state.filter);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.history.push(``);
  };

  async componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    console.log(query);

    this.setState({ loading: true });
    const news = await getSearchNews(query.searchTerm);
    this.setState({ loading: false, results: news.data.articles });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     this.getData();
  //   }
  // }

  // https://newsapi.org/v2/everything?q=apples&sources=bbc-news&apiKey=174fa93fc630400bb21846743dcc5f64

  displayNewsOptions = () => {
    return newsSources.map((item) => (
      <option key={item.name} value={item.path}>
        {item.name}
      </option>
    ));
  };
  render() {
    console.log(this.props);
    return (
      <NavFilterBarContainer>
        <NavFilterBarContainerInner>
          <form onSubmit={this.handleSubmit}>
            <label>
              Filter by news source:
              <select defaultValue={"DEFAULT"} onChange={this.handleChange}>
                <option value="DEFAULT" disabled>
                  Select Source
                </option>
                {this.displayNewsOptions()}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </NavFilterBarContainerInner>
      </NavFilterBarContainer>
    );
  }
}

export default withRouter(NavFilterBar);
