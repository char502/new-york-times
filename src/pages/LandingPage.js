import React from "react";
import styled from "styled-components/macro";
import moment from "moment";
import { landingPageNews } from "../newsSources";
import { getNews } from "../utils/api";
import { H1, H3 } from "../components/Typography";
import Carousel from "../components/Carousel/MainCarousel";
import imagePlaceholder from "../Images/imagePlaceholder.png";
import { Button } from "../components/Button";
import LandingPageNewsItem from "../components/LandingPageNewsItem";
import { withConsumer } from "../loadingContext";
import { withNotificationConsumer } from "../notificationContext";

const LandingPageBodyContainer = styled.div`
  width: 100vw;
  padding: 0 32px;
  box-sizing: border-box;
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
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (max-width: 978px) {
    width: 100%;
  }
  @media (max-width: 375px) {
    width: 100%;
  }
`;

const StyledTitle = styled.div`
  padding: 30px 0;
  font-family: "Vidaloka", serif;
`;

const CarouselContainer = styled.div`
  width: 714px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
  }
`;

// === SideBar styling ===
const SideBar = styled.div`
  width: 33.33%;
  height: 100%;
  padding: 0 20px;
  margin: 20px 10px 10px 10px;
  background-color: WhiteSmoke;
  @media (max-width: 1000px) {
    display: none;
  }
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

const ButtonContainer = styled.div``;

const NoNewsItems = styled.div`
  padding: 5px;
  margin: 10px;
  background-color: lightgray;
`;
// === End of SideBar styling ===

class LandingPage extends React.Component {
  state = {
    newsSourceMainSlider: [],
    newsSourceSecond: [],
    newsSourceThird: [],
    topTenSaved: []
  };

  async componentDidMount() {
    this.props.setLoadingValue(true);

    const [ResponseOne, ResponseTwo, ResponseThree] = await Promise.all(
      landingPageNews.map(({ path }) => getNews(path))
    );

    this.props.setLoadingValue(false);

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

  notificationMessage = (article, isAlert) =>
    this.props.setNotificationValue({
      color: isAlert,
      alertMessage: isAlert,
      data: article,
      textWhenTrue: "already saved",
      textWhenFalse: "saved"
    });

  handleRemoveItem = topNewsItem => {
    const { topTenSaved } = this.state;

    const resultWhenItemRemoved = topTenSaved.filter(arrItem => {
      return arrItem !== topNewsItem;
    });

    this.setState({ topTenSaved: resultWhenItemRemoved });

    const savedResults = JSON.parse(localStorage.getItem("savedNews"));
    if (resultWhenItemRemoved !== savedResults) {
      localStorage.setItem("savedNews", JSON.stringify(resultWhenItemRemoved));
    }
  };

  handleSaveItem = result => {
    const savedResult = {
      ...result,
      savedAt: moment().format("YYYY-MM-DD") //format: "2019-08-15"
    };

    let newsArr = [];

    if (!localStorage.getItem("savedNews")) {
      newsArr.push(savedResult);
      localStorage.setItem("savedNews", JSON.stringify(newsArr));
    } else if (localStorage.getItem("savedNews")) {
      newsArr = JSON.parse(localStorage.getItem("savedNews"));

      let alreadyInArr = newsArr.some(newsItem => {
        return newsItem.title === savedResult.title;
      });
      if (!alreadyInArr) {
        newsArr.push(savedResult);
        localStorage.setItem("savedNews", JSON.stringify(newsArr));
        this.notificationMessage(savedResult, false);
      } else {
        this.notificationMessage(savedResult, true);
      }
    }

    // Updates top ten saved straight after clicking saved button
    // This works for the additional news items not MainCarousel in landing page

    this.reloadLocalStorage();
  };

  reloadLocalStorage = () => {
    const newsArticles = JSON.parse(localStorage.getItem("savedNews"));

    this.setState({
      topTenSaved: newsArticles
    });
  };

  // componentDidUpdate(prevState, prevProps) {
  //   console.log(prevProps.topTenSaved);
  //   console.log(this.state.topTenSaved);
  //   if (prevProps.topTenSaved !== this.state.topTenSaved) {
  //     console.log("Hellooooooo");
  //     const newsArticles = JSON.parse(localStorage.getItem("savedNews"));
  //     console.log(newsArticles);
  //     this.setState({
  //       topTenSaved: newsArticles
  //     });
  //   }
  // }

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
            <StyledTitle>
              <H1>BBC News Top Headlines</H1>
            </StyledTitle>
            <CarouselContainer>
              <Carousel
                handleClick={this.handleSaveItem}
                newsData={newsSourceMainSlider}
                reloadLocalStorage={this.reloadLocalStorage}
              />
            </CarouselContainer>
            <LandingPageNewsItem
              data={newsSourceSecond}
              key={newsSourceSecond.url}
              title="The Next Web - Top Headlines"
              handleClick={this.handleSaveItem}
            />
            <LandingPageNewsItem
              data={newsSourceThird}
              key={newsSourceSecond.url}
              title="National Geographic - Top Headlines"
              handleClick={this.handleSaveItem}
            />
          </Container>
          <SideBar>
            <H3>
              <StyledHeader>Top 10 Saved News Articles</StyledHeader>
            </H3>
            {topTenSaved.length > 0 ? (
              topTenSaved.map((topNewsItem, index) => {
                return (
                  <TopNewsContainer key={topNewsItem.title}>
                    <ImageAndTitle>
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
                      <ButtonContainer>
                        <Button
                          delete
                          small
                          onClick={() => this.handleRemoveItem(topNewsItem)}
                        >
                          X
                        </Button>
                      </ButtonContainer>
                    </ImageAndTitle>
                  </TopNewsContainer>
                );
              })
            ) : (
              <NoNewsItems>No News Items Saved</NoNewsItems>
            )}
          </SideBar>
        </LandingPageBodyContainerInner>
      </LandingPageBodyContainer>
    );
  }
}

export default withNotificationConsumer(withConsumer(LandingPage));
