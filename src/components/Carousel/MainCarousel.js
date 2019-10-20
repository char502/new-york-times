import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../Card";
import { Title } from "../Typography";
// import CarouselButton from "./CarouselButton";
import { CustomPrevArrow, CustomNextArrow } from "./CarouselButton";

// ======== Styled Components ========

const MainCarouselContainer = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: auto;
  /* padding-top: 64px; */
  /* max-width: 900px;
  max-height: 500px; */
  /* padding: 5px; */
`;

const SliderWrap = styled.div`
  .slick-slider .slick-initialized {
    height: 60vh;
  }
`;

// ===================================

class MainCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next;
    this.previous = this.previous;
  }

  next = () => {
    this.slider.slickNext();
  };
  previous = () => {
    this.slider.slickPrev();
  };

  handleSaveItem = (article) => {
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

      let alreadyInArr = articleArr.some((newsItem) => {
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
      nextArrow: <CustomPrevArrow />,
      prevArrow: <CustomNextArrow />
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
        <SliderWrap>
          <Slider ref={(c) => (this.slider = c)} {...settings}>
            {newsData.map((article) => (
              <div key={article.url}>
                <Card
                  data={article}
                  text="Save"
                  handleClick={this.handleSaveItem}
                  /* extended */
                />
              </div>
            ))}
          </Slider>
        </SliderWrap>
      </MainCarouselContainer>
    );
  }
}

export default withRouter(MainCarousel);
