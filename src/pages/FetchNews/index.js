// import React from "react";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";
import { getNews } from "../../utils/api";
import MainCarousel from "../../components/Carousel/MainCarousel";
import { LoadingContext } from "../../loadingContext";

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

const FetchNews = ({ location }) => {
  const [news, setNews] = useState([]);

  const loader = useContext(LoadingContext);
  console.log(loader);

  useEffect(() => {
    async function fetchApi() {
      loader.setLoadingValue(true);

      const response = await getNews(location.pathname.split("/")[1]);
      const news = response.data.articles;

      setNews(news);
      loader.setLoadingValue(false);
    }
    fetchApi();
  }, [location.pathname]);

  return (
    <MainBodyContainer>
      <MainBodyContainerInner loading={loader.loading.toString()}>
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

export default FetchNews;
