// import React from "react";
import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { getNews } from "../../utils/api";
import MainCarousel from "../../components/Carousel/MainCarousel";
import { withConsumer } from "../../loadingContext";

const MainBodyContainer = styled.div`
  width: 100vw;
  background-color: WhiteSmoke;
  padding: 0 32px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const MainBodyContainerInner = styled.div`
  width: 100%;
  min-height: ${(props) => props.loading && "calc(100vh - 80px)"};
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledTitle = styled.div`
  font-size: 32px;
  width: 100%;
  max-width: 800px;
  padding: 0;
  margin: 32px auto;
  font-family: "Vidaloka", serif;
  @media (max-width: 769px) {
    margin: 0;
    padding: 0;
    padding: 20px;
  }
`;

const FetchNews = ({ loading, setLoadingValue, location }) => {
  const [news, setNews] = useState([]);

  console.log(loading);
  useEffect(() => {
    async function fetchApi() {
      setLoadingValue(true);

      const response = await getNews(location.pathname.split("/")[1]);
      const news = response.data.articles;

      setNews(news);
      setLoadingValue(false);
    }
    fetchApi();
  }, [setLoadingValue, location.pathname]);

  return (
    <MainBodyContainer>
      <MainBodyContainerInner loading={loading}>
        <StyledTitle>
          {location.pathname
            .split("/")
            .join(" ")
            .toUpperCase()}
        </StyledTitle>
        <MainCarousel limit={"800px"} newsData={news} />
      </MainBodyContainerInner>
    </MainBodyContainer>
  );
};

export default withConsumer(FetchNews);
