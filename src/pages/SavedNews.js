import React from "react";
import moment from "moment";
import styled from "styled-components/macro";
import Card from "./reusableComponents/Card";

// ======== Styled Components ========
const SavedNewsContainer = styled.div`
  width: 100vw;
`;

const SavedNewsContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
// ===================================

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
          <button onClick={this.handleClearAll}>Clear All Saved News</button>
          <ul>
            {savedNewsPastWeek.map((newsItem) => (
              <Card
                data={newsItem}
                handleItem={this.handleRemoveItem}
                text="remove"
                extended
              />
            ))}
          </ul>
        </SavedNewsContainerInner>
      </SavedNewsContainer>
    );
  }
}

export default SavedNews;
