import React from "react";
import moment from "moment";
import Card from "./reusableComponents/Card";

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

    console.log(savedNewsPastWeek);
    return (
      <div>
        <button onClick={this.handleClearAll}>Clear All Saved News</button>
        <ul>
          <div>
            {savedNewsPastWeek.map((newsItem) => (
              <Card
                key={newsItem.url}
                item={newsItem.title}
                handleAction={this.handleRemoveItem}
                text="Remove"
                author={newsItem.author}
                publishedAt={newsItem.publishedAt}
                extended
              />
            ))}
          </div>
        </ul>
      </div>
    );
  }
}

export default SavedNews;
