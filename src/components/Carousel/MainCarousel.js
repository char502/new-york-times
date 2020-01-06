import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import Slider from "react-slick";
import Card from "../Card";
import { CustomArrow } from "./CarouselButton";
import { withNotificationConsumer } from "../../notificationContext";

const StyledSlider = styled(Slider)`
  & {
    margin: 0 auto;
    position: relative;
    max-width: ${(props) => props.limit};
  }
  .slick-list {
    height: 100%;
    margin-bottom: 64px;
  }
  .slick-arrow {
    position: absolute;
    width: 48px;
    height: 44px;
    margin: 10px 0;
    padding: 10px 0;
    top: unset;
    bottom: -88px;
    padding: 0;
    box-sizing: border-box;
    border-radius: 0;
  }
  .slick-arrow::before {
    display: none;
  }
  .slick-prev {
    z-index: 1;
    font-weight: bold;
    font-size: 30px;
  }
  .slick-next {
    font-weight: bold;
    font-size: 30px;
    z-index: 1;
  }
  .slick-prev {
    left: 0;
  }
  .slick-next {
    left: 48px;
  }
`;

class MainCarousel extends React.Component {
  notificationMessage = (article, isAlert) =>
    this.props.setNotificationValue({
      color: isAlert,
      alertMessage: isAlert,
      data: article,
      textWhenTrue: "already saved",
      textWhenFalse: "saved"
    });

  handleSaveItem = (article) => {
    const savedArticle = {
      ...article,
      savedAt: moment().format("YYYY-MM-DD")
    };
    let articleArr = [];
    if (!localStorage.getItem("savedNews")) {
      articleArr.push(savedArticle);
      localStorage.setItem("savedNews", JSON.stringify(articleArr));
    } else if (localStorage.getItem("savedNews")) {
      articleArr = JSON.parse(localStorage.getItem("savedNews"));
      let alreadyInArr = articleArr.some((newsItem) => {
        return newsItem.title === savedArticle.title;
      });
      if (!alreadyInArr) {
        articleArr.push(savedArticle);
        localStorage.setItem("savedNews", JSON.stringify(articleArr));
        this.notificationMessage(article, false);
      } else {
        this.notificationMessage(article, true);
      }
    }
  };

  render() {
    const { newsData } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: 0,
      slideWidth: 0.7,
      nextArrow: <CustomArrow next />,
      prevArrow: <CustomArrow />
    };

    return (
      <StyledSlider limit={this.props.limit} {...settings}>
        {newsData.map((article) => (
          <Card
            key={article.url}
            data={article}
            text="Save"
            handleClick={this.handleSaveItem}
            showSource
          />
        ))}
      </StyledSlider>
    );
  }
}

export default withNotificationConsumer(MainCarousel);
