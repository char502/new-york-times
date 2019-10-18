import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../Card";
import { Title } from "../Typography";
import { Button } from "../Button";

// ======== Styled Components ========

const MainCarouselContainer = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: auto;
  /* max-width: 900px;
  max-height: 500px; */
  /* padding: 5px; */
`;

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  margin: 10px;
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
      slideWidth: 0.7
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
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {newsData.map((article) => (
            <div key={article.url}>
              <Card
                data={article}
                text="Save"
                handleClick={this.handleSaveItem}
                /* extended */
              ></Card>
            </div>
          ))}
        </Slider>
        <ScrollButtonContainer>
          <Button small className="button" onClick={this.previous}>
            Previous
          </Button>
          <Button small className="button" onClick={this.next}>
            Next
          </Button>
        </ScrollButtonContainer>
      </MainCarouselContainer>
    );
  }
}

//lodash capitalisefirst

export default withRouter(MainCarousel);
