import React from "react";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../pages/reusableComponents/Card";

class MainCarousel extends React.Component {
  handleSaveItem = (article) => {
    const savedArticle = {
      ...article,
      savedAt: moment().format("YYYY-MM-DD")
    };

    let articleArr = [];

    if (localStorage.getItem("savedNews")) {
      articleArr = JSON.parse(localStorage.getItem("savedNews"));
    }
    articleArr.push(savedArticle);
    localStorage.setItem("savedNews", JSON.stringify(articleArr));
  };

  render() {
    const { newsData } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        {/* <h2>Single Item</h2> */}
        <Slider {...settings}>
          {newsData.map((article) => (
            <>
              <h2>{article.source.id.toUpperCase()}</h2>
              <Card
                data={article}
                text="Save"
                handleItem={this.handleSaveItem}
                extended
              />
            </>
          ))}
        </Slider>
      </div>
    );
  }
}

export default MainCarousel;
