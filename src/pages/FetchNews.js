import React from "react";
import { getNews } from "../utils/api";
import styled from "styled-components/macro";
import MainCarousel from "../components/Carousel/MainCarousel";
import Loading from "react-loading-bar";

// ======== Styled Components ========
const MainBodyContainer = styled.div`
  width: 100vw;
  background-color: LightSkyBlue;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
// ===================================

class FetchNews extends React.Component {
  state = {
    news: [],
    show: false
  };

  async componentDidMount() {
    this.setState({ show: true });

    const response = await getNews(this.props.location.pathname.split("/")[1]);
    const news = response.data.articles;
    this.setState({
      show: false,
      news
    });
  }

  // add = (value) => {
  //   this.setState({
  //     loadingBarProgress: this.state.loadingBarProgress + value
  //   });
  // };

  render() {
    const { news } = this.state;

    return (
      <MainBodyContainer>
        {this.props.path}
        <MainBodyContainerInner>
          <Loading show={this.state.show} color="red" />
          <MainCarousel newsData={news} />
        </MainBodyContainerInner>
      </MainBodyContainer>
    );
  }
}

export default FetchNews;
