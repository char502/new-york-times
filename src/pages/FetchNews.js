import React from "react";
import { getNews } from "../utils/api";
import styled from "styled-components/macro";
import MainCarousel from "../components/Carousel/MainCarousel";

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
    news: []
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getNews(this.props.location.pathname.split("/")[1]);
    const news = response.data.articles;
    this.setState({
      loading: false,
      news
    });
  }
  render() {
    return (
      <MainBodyContainer>
        {this.props.path}
        <MainBodyContainerInner>
          <MainCarousel newsData={this.state.news} />
        </MainBodyContainerInner>
      </MainBodyContainer>
    );
  }
}

export default FetchNews;
