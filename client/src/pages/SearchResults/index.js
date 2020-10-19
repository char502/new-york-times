// import React from "react";
import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import styled from "styled-components/macro";
import moment from "moment";
import { getSearchNews } from "../../utils/api";
import NoSearchResults from "../../components/NoSearchResults";
import Card from "../../components/Card";
import { LoadingContext } from "../../loadingContext";
import { withNotificationConsumer } from "../../notificationContext";

const SearchResultsContainer = styled.div`
  width: 100vw;
`;

const SearchResultsContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  padding: 10px;
`;

const SearchResults = ({ location, setNotificationValue }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const loader = useContext(LoadingContext);

  useEffect(() => {
    async function getData() {
      try {
        let query = queryString.parse(location.search);
        loader.setLoadingValue(true);
        if (!query.searchTerm) {
          return loader.setLoadingValue(false);
        }
        const news = await getSearchNews(query.searchTerm, query.sources);
        console.log(news.data)
        setResults(news.data);
        loader.setLoadingValue(false);
      } catch (err) {
        console.error(error);
        setError(true);
        loader.setLoadingValue(false);
      }
    }
    getData();
  }, [location.search, error]);

  const notificationMessage = (article, isAlert) =>
    setNotificationValue({
      color: isAlert,
      alertMessage: isAlert,
      data: article,
      textWhenTrue: "already saved",
      textWhenFalse: "saved",
    });

  const handleSaveItem = (result) => {
    const savedResult = {
      ...result,
      savedAt: moment().format("YYYY-MM-DD"), // format: "2019-08-15"
    };

    let newsArr = [];

    if (!localStorage.getItem("savedNews")) {
      newsArr.push(savedResult);
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
    } else if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));

      let alreadyInArr = newsArr.some((newsItem) => {
        return newsItem.title === savedResult.title;
      });
      if (!alreadyInArr) {
        newsArr.push(savedResult);
        localStorage.setItem("savedNews", JSON.stringify(newsArr));
        notificationMessage(savedResult, false);
      } else {
        notificationMessage(savedResult, true);
      }
    }
  };

  let query = queryString.parse(location.search);
  console.log(query.searchTerm);

  return results.length > 0 ? (
    <SearchResultsContainer>
      <SearchResultsContainerInner>
        {results.map((result) => (
          <CardContainer key={result.url}>
            <Card
              data={result}
              text="Save"
              handleClick={handleSaveItem}
              extended
              showSource
            />
          </CardContainer>
        ))}
      </SearchResultsContainerInner>
    </SearchResultsContainer>
  ) : (
    <NoSearchResults />
  );
};

export default withNotificationConsumer(SearchResults);
