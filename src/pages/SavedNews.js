import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "../components/Card";
import { Button, AltButton } from "../components/Button";
import { H1, H4 } from "../components/Typography";
import { withNotificationConsumer } from "../notificationContext";

//test

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

const SavedNews = (props) => {
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

  const notificationMessage = (itemToRemove, isAlert) => {
    let dateSavedToReversed = "";
    const fromLocStorage = JSON.parse(localStorage.getItem("savedNews"));
    const result = fromLocStorage.filter((item) => {
      return item.title === itemToRemove.title;
    });

    if (result.length === 0) {
      dateSavedToReversed = "no date";
    } else {
      let dateSavedTo = result[0].savedAt;
      dateSavedToReversed = dateSavedTo
        .split("-")
        .reverse()
        .join("-");
    }

    props.setNotificationValue({
      color: isAlert,
      alertMessage: isAlert,
      data: itemToRemove,
      textWhenTrue: "removed",
      textWhenFalse: `saved until: ${dateSavedToReversed}`
    });
  };

  const handleRemoveItem = (itemToRemove) => {
    const newSavedNews = savedNews.filter((newsItem) => {
      return newsItem !== itemToRemove;
    });

    setSavedNews(newSavedNews);
    localStorage.setItem("savedNews", JSON.stringify(newSavedNews));
    notificationMessage(itemToRemove, true);
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
    notificationMessage(itemToExtend, false);
  };

  const handleClearAll = () => {
    localStorage.clear("savedNews");
    setSavedNews([]);
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

export default withNotificationConsumer(SavedNews);
