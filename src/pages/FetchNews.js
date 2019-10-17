import React from "react";
import { getNews } from "../utils/api";
import styled from "styled-components/macro";
import MainCarousel from "../components/Carousel/MainCarousel";
import { LoadingConsumer } from "../loadingContext";

// ======== Styled Components ========
const MainBodyContainer = styled.div`
  width: 100vw;
  background-color: lightgrey;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.div`
  padding: 5px;
`;
// ===================================

class FetchNews extends React.Component {
  state = {
    news: [],
    show: false
  };

  fetchApi = async () => {
    this.props.setLoading(true);

    const response = await getNews(this.props.location.pathname.split("/")[1]);
    const news = response.data.articles;
    this.setState({
      news
    });
    this.props.setLoading(false);
  };

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    const { news } = this.state;

    return (
      <MainBodyContainer>
        <Title>{this.props.path}</Title>
        <MainBodyContainerInner>
          <MainCarousel newsData={news} />
        </MainBodyContainerInner>
      </MainBodyContainer>
    );
  }
}

export default (props) => (
  <LoadingConsumer>
    {(loading) => <FetchNews {...loading} {...props} />}
  </LoadingConsumer>
);
