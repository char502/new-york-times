import React from "react";
import Loading from "react-loading-bar";
import styled from "styled-components/macro";
import { landingPageNews } from "../newsSources";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNews } from "../utils/api";

// import MainCarousel from "../components/Carousel/MainCarousel";

// ======== Styled Components ========
const LandingPageBodyContainer = styled.div`
  width: 100vw;
`;

const LandingPageBodyContainerInner = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  max-width: 1200px;
  /* margin: 0 auto; */
  height: 120px;
  background-color: LightSkyBlue;
  padding: 30px;
`;

const NewsSourceSecondContainer = styled.div`
  max-width: 1200px;
  height: auto;
  background-color: lightpink;
  padding: 30px;
`;

const NewsSourceThirdContainer = styled.div`
  max-width: 1200px;
  height: auto;
  background-color: lightseagreen;
  padding: 30px;
`;
// ===================================

class LandingPage extends React.Component {
  state = {
    newsSourceMainSlider: [],
    newsSourceSecond: [],
    newsSourceThird: [],
    show: false
  };

  async componentDidMount() {
    this.setState({ show: true });

    const [ResponseOne, ResponseTwo, ResponseThree] = await Promise.all([
      getNews(landingPageNews[0].path),
      getNews(landingPageNews[1].path),
      getNews(landingPageNews[2].path)
    ]);

    let newsSourceMainSlider = ResponseOne.data.articles;
    let newsSourceSecond = ResponseTwo.data.articles;
    let newsSourceThird = ResponseThree.data.articles;

    this.setState({
      show: false,
      newsSourceMainSlider,
      newsSourceSecond,
      newsSourceThird
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    // console.log(this.state.newsSourceMainSlider);
    // console.log(landingPageNews[0].path);

    const {
      newsSourceMainSlider,
      newsSourceSecond,
      newsSourceThird
    } = this.state;

    return (
      <LandingPageBodyContainer>
        <LandingPageBodyContainerInner>
          <Loading show={this.state.show} color="red" />
          <SliderContainer>
            <h1>BBC News Top Headlines</h1>
            <Slider {...settings}>
              {newsSourceMainSlider.map((newsArticle) => (
                <div key={newsArticle.title}>
                  <a href={newsArticle.url}>{newsArticle.title}</a>
                </div>
              ))}
            </Slider>
          </SliderContainer>
          <hr />
          <NewsSourceSecondContainer>
            <h1>Time Magazine Top Headlines</h1>
            <div>
              {newsSourceSecond.map((timeNewsArticle, index) => (
                <ul key={index}>
                  <li>
                    <a href={timeNewsArticle.url}>{timeNewsArticle.title}</a>
                  </li>
                </ul>
              ))}
            </div>
          </NewsSourceSecondContainer>
          <hr />
          <NewsSourceThirdContainer>
            <h1>New Scientist Top Headlines</h1>
            <div>
              {newsSourceThird.map((newScientist, index) => (
                <ul key={index}>
                  <li>
                    <a href={newScientist.url}>{newScientist.title}</a>
                  </li>
                </ul>
              ))}
            </div>
          </NewsSourceThirdContainer>
        </LandingPageBodyContainerInner>
      </LandingPageBodyContainer>
    );
  }
}

export default LandingPage;
