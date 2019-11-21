import React from "react";
import { getNews } from "../../utils/api";
import styled from "styled-components/macro";
import MainCarousel from "../../components/Carousel/MainCarousel";
import { LoadingConsumer } from "../../loadingContext";

const MainBodyContainer = styled.div`
  width: 100vw;
  background-color: WhiteSmoke;
  padding: 0 32px;
  margin: 0 auto;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  /* min-height: calc(100vh - 80px); */
  min-height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledTitle = styled.div`
  font-size: 32px;
  margin: 28px;
  padding: 20px 0 0 250px;
  font-family: "Vidaloka", serif;
  @media (max-width: 769px) {
    margin: 0;
    padding: 0;
    padding: 20px;
  }
`;

class FetchNews extends React.Component {
  state = {
    news: [],
    show: false
  };

  fetchApi = async () => {
    this.props.setLoadingValue(true);

    const response = await getNews(this.props.location.pathname.split("/")[1]);
    console.log(response);
    const news = response.data.articles;
    this.setState({
      news
    });
    this.props.setLoadingValue(false);
  };

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    const { news } = this.state;
    return (
      <MainBodyContainer>
        <MainBodyContainerInner>
          <StyledTitle>
            {this.props.location.pathname
              .split("/")
              .join(" ")
              .toUpperCase()}
          </StyledTitle>
          <MainCarousel newsData={news} />
        </MainBodyContainerInner>
      </MainBodyContainer>
    );
  }
}

export default (props) => (
  <LoadingConsumer>
    {(values) => <FetchNews {...values} {...props} />}
  </LoadingConsumer>
);
