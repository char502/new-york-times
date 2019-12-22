import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "../components/Card";
import { Button, AltButton } from "../components/Button";
import { H1, H4 } from "../components/Typography";

const SavedNewsContainer = styled.div`
  width: 100vw;
`;

const SavedNewsContainerInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export default (props) => {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("savedNews")) {
      const savedResults = JSON.parse(localStorage.getItem("savedNews"));
      const filteredSavedResults = savedResults.filter((savedResult) => {
        const thresholdDate = moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD");

        return moment(savedResult.savedAt).isAfter(thresholdDate);
      });

      setSavedNews(filteredSavedResults);

      if (filteredSavedResults !== savedResults) {
        localStorage.setItem("savedNews", JSON.stringify(filteredSavedResults));
      }
    }
  }, []);

  const handleClearAll = () => {
    localStorage.clear("savedNews");
    setSavedNews([]);
  };

  const handleRetainItem = (itemToExtend) => {
    const newSavedNews = savedNews.map((newsItem) => {
      if (newsItem === itemToExtend) {
        const addTime = moment()
          .add(7, "days")
          .format("YYYY-MM-DD");

        newsItem.savedAt = addTime;
      }

      return newsItem;
    });

    localStorage.setItem("savedNews", JSON.stringify(newSavedNews));
    setSavedNews(newSavedNews);
  };

  const handleRemoveItem = (itemToRemove) => {
    console.log(props);
    const newSavedNews = savedNews.filter((newsItem) => {
      return newsItem !== itemToRemove;
    });

    setSavedNews(newSavedNews);

    localStorage.setItem("savedNews", JSON.stringify(newSavedNews));
  };

  return (
    <SavedNewsContainer>
      <SavedNewsContainerInner>
        <ActionContainer>
          <div>
            <H1>Saved News</H1>
            <H4 color="red">Saved Items will be cleared after a week</H4>
          </div>
          <div>
            <Button small onClick={handleClearAll}>
              Clear All Saved News
            </Button>
          </div>
        </ActionContainer>

        {savedNews.map((newsItem) => (
          <Card
            key={newsItem.title}
            data={newsItem}
            handleClick={handleRemoveItem}
            text="remove"
            extended
            showSource
          >
            <ButtonContainer>
              <AltButton small onClick={() => handleRetainItem(newsItem)}>
                Retain Item for another week
              </AltButton>
            </ButtonContainer>
          </Card>
        ))}
      </SavedNewsContainerInner>
    </SavedNewsContainer>
  );
};
