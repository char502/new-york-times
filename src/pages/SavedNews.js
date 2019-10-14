import React from "react";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "../components/Card";
import { Button } from "../components/Button";
import { H1, H4 } from "../components/Typography";

// ======== Styled Components ========
const SavedNewsContainer = styled.div`
  width: 100vw;
`;

const SavedNewsContainerInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const StyledHeaderFour = styled.h4`
  margin-left: 24px;
`;

// ===================================

const ActionContainer = styled.div`
  display: flex;
`;

class SavedNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedNewsPastWeek: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("savedNews")) {
      const savedResults = JSON.parse(localStorage.getItem("savedNews"));

      const filteredSavedResults = savedResults.filter((savedResult) => {
        const savedAtTime = savedResult.savedAt;
        const aWeekAgo = moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD");

        return savedAtTime > aWeekAgo;
      });
      this.setState({ savedNewsPastWeek: filteredSavedResults });

      if (filteredSavedResults !== savedResults) {
        localStorage.setItem("savedNews", JSON.stringify(filteredSavedResults));
      }
    }
  }

  handleRemoveItem = (newsItem) => {
    const { savedNewsPastWeek } = this.state;

    const resultWhenItemRemoved = savedNewsPastWeek.filter((arrItem) => {
      return arrItem !== newsItem;
    });

    this.setState({ savedNewsPastWeek: resultWhenItemRemoved });

    const savedResults = JSON.parse(localStorage.getItem("savedNews"));
    if (resultWhenItemRemoved !== savedResults) {
      localStorage.setItem("savedNews", JSON.stringify(resultWhenItemRemoved));
    }
  };

  handleClearAll = () => {
    localStorage.clear("savedNews");
    this.setState({
      savedNewsPastWeek: []
    });
  };

  render() {
    const { savedNewsPastWeek } = this.state;
    return (
      <SavedNewsContainer>
        <SavedNewsContainerInner>
          <H1>Saved News</H1>
          <ActionContainer>
            <Button small onClick={this.handleClearAll}>
              Clear All Saved News
            </Button>
            <H4>Note: Saved Items will be cleared after a week</H4>
          </ActionContainer>

          <div>
            {savedNewsPastWeek.map((newsItem) => (
              <Card
                data={newsItem}
                handleClick={this.handleRemoveItem}
                text="remove"
                key={newsItem.title}
              >
                <Button>Retain Item for another week</Button>
              </Card>
            ))}
          </div>
        </SavedNewsContainerInner>
      </SavedNewsContainer>
    );
  }
}

export default SavedNews;
