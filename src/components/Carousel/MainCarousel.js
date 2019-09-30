import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MainCarousel extends React.Component {
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
        <h2>Single Item</h2>
        <Slider {...settings}>
          {newsData.map((article) => (
            <div key={article.title}>{article.title}</div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default MainCarousel;
