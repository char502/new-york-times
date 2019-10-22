import React from "react";
import Loading from "react-loading-bar";
import styled, { css } from "styled-components/macro";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingPageNews } from "../newsSources";
import { getNews } from "../utils/api";
import { Title } from "../components/Typography";
import { H1, H4 } from "../components/Typography";
import Carousel from "../components/Carousel/MainCarousel";
import imagePlaceholder from "../Images/imagePlaceholder.png";
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
  padding: 30px;
  font-family: "Vidaloka", serif;
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

// === Seondary news items styling

const StyledListItem = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-width: 0;
    padding-bottom: 50px;
  }
`;

const LinkContainer = styled.div`
  flex: 3;
  align-self: center;
`;

const LinkContainerInner = styled.div`
  margin-bottom: 8px;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const ImageContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const SecondaryHeadlineImage = styled.img`
  height: 80px;
  width: 80px;
`;

const SecondaryHeadlineAuthor = styled.p`
  color: lightseagreen;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 12px;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const SecondaryHeadlinePublished = styled.p`
  font-size: 10px;
  /* font-weight: bold; */
  margin: 0;
  padding: 0;
  /* color: grey; */
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

// === end of secondary news items styling ===

// === SideBar styling ===
const SideBar = styled.div`
  width: 33.33%;
  height: 100%;
  padding: 0 20px;
  margin: 10px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  background-color: WhiteSmoke;
`;

const StyledHeader = styled.div`
  font-family: "Vidaloka", serif;
  margin: 20px 20px 20px 0;
`;

const TopNewsContainer = styled.div`
  /* border: 0.5px solid black; */
`;

const ImageAndTitle = styled.div`
  display: flex;
  padding: 10px 10px 10px 20px;
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
  /* word-wrap: break-word; */
`;

// === End of SideBar styling ===

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

    console.log(newsSourceThird);
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
              <ul>
                {newsSourceSecond.map((timeNewsArticle) => (
                  <StyledListItem key={timeNewsArticle.url}>
                    <ImageContainer>
                      <SecondaryHeadlineImage
                        src={
                          timeNewsArticle.urlToImage
                            ? timeNewsArticle.urlToImage
                            : imagePlaceholder
                        }
                      />
                    </ImageContainer>
                    <LinkContainer>
                      <LinkContainerInner>
                        <H4 as="a" href={timeNewsArticle.url} target="_blank">
                          {timeNewsArticle.title}
                        </H4>
                      </LinkContainerInner>
                      <SecondaryHeadlineAuthor>
                        Author: {timeNewsArticle.author}
                      </SecondaryHeadlineAuthor>
                      <SecondaryHeadlinePublished>
                        Published:{" "}
                        {moment(timeNewsArticle.publishedAt).fromNow()}
                      </SecondaryHeadlinePublished>
                    </LinkContainer>
                  </StyledListItem>
                ))}
              </ul>
            </NewsSourceSecondContainer>
            <NewsSourceThirdContainer>
              <Title>New Scientist Top Headlines</Title>
              <div>
                <ul>
                  {newsSourceThird.map((newScientist) => (
                    <StyledListItem key={newScientist.url}>
                      <LinkContainer>
                        <LinkContainerInner right>
                          <H4 as="a" href={newScientist.url} target="_blank">
                            {newScientist.title}
                          </H4>
                        </LinkContainerInner>
                        <SecondaryHeadlineAuthor right>
                          Author: {newScientist.author}
                        </SecondaryHeadlineAuthor>
                        <SecondaryHeadlinePublished right>
                          Published:{" "}
                          {moment(newScientist.publishedAt).fromNow()}
                        </SecondaryHeadlinePublished>
                      </LinkContainer>

                      <ImageContainer>
                        <SecondaryHeadlineImage
                          src={
                            newScientist.urlToImage
                              ? newScientist.urlToImage
                              : imagePlaceholder
                          }
                        />
                      </ImageContainer>
                    </StyledListItem>
                  ))}
                </ul>
              </div>
            </NewsSourceThirdContainer>
          </Container>
          <SideBar>
            <H4>
              <StyledHeader>Top 10 Saved News Articles</StyledHeader>
            </H4>
            {topTenSaved.map((topNewsItem, index) => {
              return (
                <TopNewsContainer key={topNewsItem.title}>
                  <ImageAndTitle>
                    <div>
                      <SavedImage
                        src={
                          topNewsItem.urlToImage
                            ? topNewsItem.urlToImage
                            : imagePlaceholder
                        }
                      />
                    </div>
                    <TopNewsTitle as="a" href={topNewsItem.url} target="_blank">
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
