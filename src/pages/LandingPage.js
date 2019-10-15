import React from "react";
import Loading from "react-loading-bar";
import styled from "styled-components/macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingPageNews } from "../newsSources";
import { getNews } from "../utils/api";
import { Title } from "../components/Typography";
import { H1, H4 } from "../components/Typography";
import Carousel from "../components/Carousel/MainCarousel";

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
  display: flex;
`;

const Container = styled.div`
  width: 66.66%;
  padding-top: 30px;
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

const SideBar = styled.div`
  width: 33.33%;
  height: 100%;
  padding: 0 20px;
  margin: 10px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* background-color: lightseagreen; */
`;

const SavedArticle = styled.div`
  padding: 15px 0;
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
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // };
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
          <Container>
            <Loading show={this.state.show} color="red" />
            <H1>BBC News Top Headlines</H1>
            <Carousel newsData={newsSourceMainSlider} />

            <NewsSourceSecondContainer>
              <Title>Time Magazine Top Headlines</Title>
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
              <Title>New Scientist Top Headlines</Title>
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
          </Container>
          <SideBar>
            <H4>Top 10 Saved News Articles</H4>
            <SavedArticle>Article 1</SavedArticle>
            <SavedArticle>Article 2</SavedArticle>
            <SavedArticle>Article 3</SavedArticle>
            <SavedArticle>Article 4</SavedArticle>
            <SavedArticle>Article 5</SavedArticle>
            <SavedArticle>Article 6</SavedArticle>
            <SavedArticle>Article 7</SavedArticle>
            <SavedArticle>Article 8</SavedArticle>
            <SavedArticle>Article 9</SavedArticle>
            <SavedArticle>Article 10</SavedArticle>
          </SideBar>
        </LandingPageBodyContainerInner>
      </LandingPageBodyContainer>
    );
  }
}

export default LandingPage;
