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
// import SavedNews from "./SavedNews";

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
  /* padding-top: 10px; */
  /* background: lightseagreen; */
`;

const StyledTitle = styled.div`
  padding-left: 30px;
`;

const NewsSourceSecondContainer = styled.div`
  max-width: 1200px;
  height: auto;

  padding: 5px 10px 10px 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  /* background-color: lightpink; */
`;

const NewsSourceThirdContainer = styled.div`
  max-width: 1200px;
  height: auto;
  padding: 5px 10px 10px 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  /* background-color: lightseagreen; */
`;

const SideBar = styled.div`
  width: 33.33%;
  height: 100%;
  padding: 0 20px;
  margin: 10px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  background-color: WhiteSmoke;
`;

const TopNewsContainer = styled.div`
  /* border: 0.5px solid black; */
`;

const ArticleNumbering = styled.div`
  padding: 5px;
`;

const ImageAndTitle = styled.div`
  display: flex;
  padding: 10px;
`;

const SavedImage = styled.img`
  height: 40px;
  width: 40px;
`;

const TopNewsTitle = styled.div`
  padding-left: 10px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;
// const SavedArticle = styled.div`
//   padding: 15px;
// `;

// ===================================

class LandingPage extends React.Component {
  state = {
    newsSourceMainSlider: [],
    newsSourceSecond: [],
    newsSourceThird: [],
    show: false,
    topTenSaved: []
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

    // Data for sidebar
    if (localStorage.getItem("savedNews")) {
      const topSaved = JSON.parse(localStorage.getItem("savedNews"));

      const topTenSaved = topSaved.filter((item, index) => index <= 9);

      this.setState({
        topTenSaved
      });
    }

    this.setState({
      show: false,
      newsSourceMainSlider,
      newsSourceSecond,
      newsSourceThird
    });
  }

  render() {
    const {
      newsSourceMainSlider,
      newsSourceSecond,
      newsSourceThird,
      topTenSaved
    } = this.state;

    // console.log(topTenSaved);
    return (
      <LandingPageBodyContainer>
        <LandingPageBodyContainerInner>
          <Container>
            <Loading show={this.state.show} color="red" />
            <StyledTitle>
              <H1>BBC News Top Headlines</H1>
            </StyledTitle>
            <Carousel newsData={newsSourceMainSlider} />
            <NewsSourceSecondContainer>
              <Title>Time Magazine Top Headlines</Title>
              <div>
                {newsSourceSecond.map((timeNewsArticle, index) => (
                  <ul key={index}>
                    <H4 as="a" href={timeNewsArticle.url}>
                      {timeNewsArticle.title}
                    </H4>
                  </ul>
                ))}
              </div>
            </NewsSourceSecondContainer>
            <NewsSourceThirdContainer>
              <Title>New Scientist Top Headlines</Title>
              <div>
                {newsSourceThird.map((newScientist, index) => (
                  <ul key={index}>
                    <li>
                      <H4 as="a" href={newScientist.url}>
                        {newScientist.title}
                      </H4>
                    </li>
                  </ul>
                ))}
              </div>
            </NewsSourceThirdContainer>
          </Container>
          <SideBar>
            <H4>Top 10 Saved News Articles</H4>
            {topTenSaved.map((topNewsItem, index) => {
              return (
                <TopNewsContainer key={topNewsItem.title}>
                  <ArticleNumbering>Article {[index + 1]}:</ArticleNumbering>
                  <ImageAndTitle>
                    <div>
                      <SavedImage src={topNewsItem.urlToImage} />
                    </div>
                    <TopNewsTitle as="a" href={topNewsItem.url}>
                      {topNewsItem.title}
                    </TopNewsTitle>
                  </ImageAndTitle>
                </TopNewsContainer>
              );
            })}
          </SideBar>
        </LandingPageBodyContainerInner>
      </LandingPageBodyContainer>
    );
  }
}

export default LandingPage;
