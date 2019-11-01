import React from "react";
import Loading from "react-loading-bar";
import styled, { css } from "styled-components/macro";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingPageNews } from "../newsSources";
import { getNews } from "../utils/api";
import { Title } from "../components/Typography";
import { H1, H3, ModH3 } from "../components/Typography";
import Carousel from "../components/Carousel/MainCarousel";
import imagePlaceholder from "../Images/imagePlaceholder.png";
import { Button } from "../components/Button";
import LandingPageNewsItem from "../components/LandingPageNewsItem";
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
`;

const StyledTitle = styled.div`
  padding: 30px 0;
  font-family: "Vidaloka", serif;
`;

// ======================================
const CarouselContainer = styled.div`
  width: 714px;
  height: 495px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  /* margin-left: 10px; */
`;

const NewsSourceSecondContainer = styled.div`
  max-width: 1200px;
  height: auto;
  /* padding: 5px 0 10px 0; */
  margin-right: 40px;
  /* border-bottom: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* background-color: lightpink; */
`;

const NewsSourceThirdContainer = styled.div`
  max-width: 1200px;
  height: auto;
  /* padding: 5px 0 10px 0; */
  margin-right: 40px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  /* background-color: lightseagreen; */
`;

// === Seondary news items styling

const StyledListItem = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  align-items: center;
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
  margin-bottom: 2px;
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
  margin: 20px 10px 10px 10px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  background-color: WhiteSmoke;
`;

const StyledHeader = styled.div`
  font-family: "Vidaloka", serif;
  margin: 20px 20px 20px 0;
`;

const TopNewsContainer = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-width: 0;
  }
`;

const ImageAndTitle = styled.div`
  display: flex;
  padding: 15px 10px 15px 20px;
  justify-content: space-between;
  align-items: center;
`;

const SavedImage = styled.img`
  height: 40px;
  width: 40px;
`;

const TopNewsTitle = styled.div`
  margin-left: 10px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  /* word-wrap: break-word; */
`;

const SourceContainer = styled.div`
  font-size: 12px;
  color: darkgray;
`;

const ButtonContainer = styled.div`
  /* justify-content: center;
  align-items: center; */
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

  handleRemoveItem = (topNewsItem) => {
    const { topTenSaved } = this.state;

    const resultWhenItemRemoved = topTenSaved.filter((arrItem) => {
      return arrItem !== topNewsItem;
    });

    this.setState({ topTenSaved: resultWhenItemRemoved });

    const savedResults = JSON.parse(localStorage.getItem("savedNews"));
    if (resultWhenItemRemoved !== savedResults) {
      localStorage.setItem("savedNews", JSON.stringify(resultWhenItemRemoved));
    }
  };

  handleSaveItem = (result) => {
    const savedResult = {
      ...result,
      savedAt: moment().format("YYYY-MM-DD")
      // savedAt: "2019-08-15"
    };

    console.log(savedResult);
    let newsArr = [];

    if (!localStorage.getItem("savedNews")) {
      newsArr.push(savedResult);
      alert("Item added to Local Storage");
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
    } else if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));

      let alreadyInArr = newsArr.some((newsItem) => {
        return newsItem.title === savedResult.title;
      });
      if (alreadyInArr) {
        return alert("item already saved");
      }

      newsArr.push(savedResult);
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
      alert("Unique Item added to Local Storage ");
    }
  };

  render() {
    const {
      newsSourceMainSlider,
      newsSourceSecond,
      newsSourceThird,
      topTenSaved
    } = this.state;

    console.log(topTenSaved);
    return (
      <LandingPageBodyContainer>
        <LandingPageBodyContainerInner>
          <Container>
            <Loading show={this.state.show} color="red" />
            <StyledTitle>
              <H1>BBC News Top Headlines</H1>
            </StyledTitle>
            <CarouselContainer>
              <Carousel newsData={newsSourceMainSlider} />
            </CarouselContainer>
            <LandingPageNewsItem
              data={newsSourceSecond}
              key={newsSourceSecond.url}
              title="The Next Web - Top Headlines"
              handleClick={this.handleSaveItem}
            />
            {/* <NewsSourceSecondContainer>
              <Title style={{ marginLeft: 0 }}>
                The Next Web - Top Headlines
              </Title>
              {newsSourceSecond.map((theNextWeb) => (
                <StyledListItem key={theNextWeb.description}>
                  <ImageContainer>
                    <SecondaryHeadlineImage
                      src={
                        theNextWeb.urlToImage
                          ? theNextWeb.urlToImage
                          : imagePlaceholder
                      }
                    />
                  </ImageContainer>
                  <LinkContainer>
                    <LinkContainerInner>
                      <ModH3 as="a" href={theNextWeb.url} target="_blank">
                        {theNextWeb.title}
                      </ModH3>
                    </LinkContainerInner>
                    <SecondaryHeadlineAuthor>
                      Author: {theNextWeb.author}
                    </SecondaryHeadlineAuthor>
                    <SecondaryHeadlinePublished>
                      Published: {moment(theNextWeb.publishedAt).fromNow()}
                    </SecondaryHeadlinePublished>
                  </LinkContainer>
                  <ButtonContainer>
                    <Button
                      small
                      onClick={() => this.handleSaveItem(theNextWeb)}
                    >
                      Save
                    </Button>
                  </ButtonContainer>
                </StyledListItem>
              ))}
            </NewsSourceSecondContainer> */}
            <NewsSourceThirdContainer>
              <Title right>National Geographic - Top Headlines</Title>
              <div>
                <ul>
                  {newsSourceThird.map((nationalGeographic) => (
                    <StyledListItem key={nationalGeographic.title}>
                      <ButtonContainer>
                        <Button
                          small
                          onClick={() =>
                            this.handleSaveItem(nationalGeographic)
                          }
                        >
                          Save
                        </Button>
                      </ButtonContainer>
                      <LinkContainer>
                        <LinkContainerInner right>
                          <ModH3
                            as="a"
                            href={nationalGeographic.url}
                            target="_blank"
                          >
                            {nationalGeographic.title}
                          </ModH3>
                        </LinkContainerInner>
                        <SecondaryHeadlineAuthor right>
                          Author: {nationalGeographic.author}
                        </SecondaryHeadlineAuthor>
                        <SecondaryHeadlinePublished right>
                          Published:{" "}
                          {moment(nationalGeographic.publishedAt).fromNow()}
                        </SecondaryHeadlinePublished>
                        {/* <div>{nationalGeographic.source.id}</div> */}
                      </LinkContainer>
                      <ImageContainer>
                        <SecondaryHeadlineImage
                          src={
                            nationalGeographic.urlToImage
                              ? nationalGeographic.urlToImage
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
            <H3>
              <StyledHeader>Top 10 Saved News Articles</StyledHeader>
            </H3>
            {topTenSaved.map((topNewsItem, index) => {
              return (
                <TopNewsContainer key={topNewsItem.title}>
                  <ImageAndTitle>
                    <div style={{ display: "flex" }}>
                      <SavedImage
                        src={
                          topNewsItem.urlToImage
                            ? topNewsItem.urlToImage
                            : imagePlaceholder
                        }
                      />
                      <TopNewsTitle
                        as="a"
                        href={topNewsItem.url}
                        target="_blank"
                      >
                        {topNewsItem.title}
                        {/* <SourceContainer>
                          Source: {topNewsItem.source.name}
                        </SourceContainer> */}
                      </TopNewsTitle>
                    </div>

                    <ButtonContainer>
                      <Button
                        style={{ color: "red", fontWeight: "bold" }}
                        small
                        onClick={() => this.handleRemoveItem(topNewsItem)}
                      >
                        x
                      </Button>
                    </ButtonContainer>
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
