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
        {/* <h2>Single Item</h2> */}
        <Slider {...settings}>
          {newsData.map((article) => (
            <div key={article.title}>
              <div>
                <h2>{article.source.id.toUpperCase()}</h2>
              </div>
              {article.title} <button>Save</button>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default MainCarousel;
