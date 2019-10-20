import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import moment from "moment";
import Slider from "react-slick";

import Card from "../Card";
import { Title } from "../Typography";
import { CustomArrow } from "./CarouselButton";

// ======== Styled Components ========

const MainCarouselContainer = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: auto;
`;

const SliderSlider = styled(Slider)`
  .slick-slider .slick-initialized {
    height: 60vh;
  }

  .slick-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
  .slick-arrow::before {
    display: none;
  }

  .slick-prev {
    left: -45px;
  }
  .slick-next {
    right: -45px;
  }
`;

// ===================================

class MainCarousel extends React.Component {
  handleSaveItem = article => {
    const savedArticle = {
      ...article,
      savedAt: moment().format("YYYY-MM-DD")
    };

    let articleArr = [];

    if (!localStorage.getItem("savedNews")) {
      articleArr.push(savedArticle);
      alert("Item added to Local Storage");
      localStorage.setItem("savedNews", JSON.stringify(articleArr));
    } else if (localStorage.getItem("savedNews")) {
      articleArr = JSON.parse(localStorage.getItem("savedNews"));

      let alreadyInArr = articleArr.some(newsItem => {
        return newsItem.title === savedArticle.title;
      });
      if (alreadyInArr) {
        return alert("item already saved");
      }
      articleArr.push(savedArticle);
      localStorage.setItem("savedNews", JSON.stringify(articleArr));
      alert("Unique Item added to Local Storage ");
    }
  };

  render() {
    const { newsData } = this.props;
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: 0,
      slideWidth: 0.7,
      nextArrow: <CustomArrow next />,
      prevArrow: <CustomArrow />
      // autoplay: true,
      // speed: 2000,
      // autoplaySpeed: 3000,
      // cssEase: "linear"
    };
    console.log();
    return (
      <MainCarouselContainer>
        <Title>
          {this.props.location.pathname
            .split("/")
            .join(" ")
            .toUpperCase()}
        </Title>
        <SliderSlider {...settings}>
          {newsData.map(article => (
            <div key={article.url}>
              <Card
                data={article}
                text="Save"
                handleClick={this.handleSaveItem}
                /* extended */
              />
            </div>
          ))}
        </SliderSlider>
      </MainCarouselContainer>
    );
  }
}

export default withRouter(MainCarousel);
