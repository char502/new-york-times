import React from "react";

class SavedNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedNews: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("newArrList")) {
      const savedResults = JSON.parse(localStorage.getItem("newArrList"));
      this.setState({ savedNews: savedResults });
    }
  }

  render() {
    console.log(this.state.savedNews);
    // const { savedNews } = this.state;

    return <div>Saved News Page</div>;
    // return (

    //   {savedNews.map((item) => {

    //   })}

    // )
  }
}

export default SavedNews;
