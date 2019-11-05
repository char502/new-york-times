import React from "react";
import Loading from "react-loading-bar";
import styled from "styled-components/macro";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landingPageNews } from "../newsSources";
import { getNews } from "../utils/api";
import { H1, H3 } from "../components/Typography";
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

const CarouselContainer = styled.div`
  width: 714px;
  height: 495px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  /* margin-left: 10px; */
`;

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
  min-width: 40px;
`;

const TopNewsTitle = styled.div`
  margin-left: 10px;
  color: black;
  text-decoration: none;
  cursor: pointer;
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
            <LandingPageNewsItem
              data={newsSourceThird}
              key={newsSourceSecond.title}
              title="National Geographic - Top Headlines"
              handleClick={this.handleSaveItem}
            />
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
                        <SourceContainer>
                          Source: {topNewsItem.source.name}
                        </SourceContainer>
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
