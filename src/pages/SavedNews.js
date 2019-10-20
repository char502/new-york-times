import React from "react";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "../components/Card";
import { Button, AltButton } from "../components/Button";
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

// ===================================

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

// const CardContainer = styled.div`
//   padding: 10px 0 20px 0;
// `;

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
          <ActionContainer>
            <div>
              <H1>Saved News</H1>
              <H4>Note: Saved Items will be cleared after a week</H4>
            </div>
            <div>
              <Button small onClick={this.handleClearAll}>
                Clear All Saved News
              </Button>
            </div>
          </ActionContainer>

          {savedNewsPastWeek.map((newsItem) => (
            <Card
              key={newsItem.title}
              data={newsItem}
              handleClick={this.handleRemoveItem}
              text="remove"
              extended
            >
              <ButtonContainer>
                <AltButton small>Retain Item for another week</AltButton>
              </ButtonContainer>
            </Card>
          ))}
        </SavedNewsContainerInner>
      </SavedNewsContainer>
    );
  }
}

export default SavedNews;
