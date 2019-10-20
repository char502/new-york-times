import React from "react";
import { getNews } from "../utils/api";
import styled from "styled-components/macro";
import MainCarousel from "../components/Carousel/MainCarousel";
import { LoadingConsumer } from "../loadingContext";

// ======== Styled Components ========
const MainBodyContainer = styled.div`
  width: 100vw;
  /* max-height: 700px; */
  background-color: WhiteSmoke;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  /* height: 100%; */
  min-height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
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
