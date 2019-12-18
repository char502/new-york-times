import React from "react";
import {
  render,
  wait,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { SearchResults } from "./index";

jest.mock("axios");

const newsArticle = {
  author: "James Vincent",
  content:
    "There’s nothing I like more on bright and cold autumnal days than heading down to the park and watching the robot dogs playing in piles of leaves. To hear the scuttle of their little metal legs! To imagine the joy in their tiny silicon brains! Ah, what bliss.… [+2643 chars]",
  description:
    "Robot dogs are better in packs. This video from MIT of nine of its Mini Cheetah quadrupedal bots scampering about in the leaves is proof. Like Boston Dynamics’ four-legged Spot, robots like this are becoming more common",
  publishedAt: "2019-11-08T14:35:00Z",
  source: { id: "the-verge", name: "The Verge" },
  title:
    "It’s that time of year again — fall is here and packs of robot dogs are frolicking in the leaves",
  url:
    "https://www.theverge.com/tldr/2019/11/8/20954917/robot-dog-pack-frolicking-leaves-mit-mini-cheetah",
  urlToImage: "https://cdn.vox-cdn.com/thumbor/WWKzxxbgjZWrGDgzkslv6JoF7eM=/0x3"
};

// describe("<SearchResults />", () => {
//   const search = "?searchTerm=breaks&sources=cnbc";
//   const props = {
//     setLoadingValue: jest.fn(),
//     location: {
//       search
//     }
//   };
//   axios.get.mockResolvedValueOnce({
//     data: { articles: [newsArticle] }
//   });
//   // beforeEach(() => {
//   // })
//   it('renders cards if there are results from the api', () => {
//   });
//   it.only('calls the api when location.search changes', () => {
//   })
// });

beforeEach(() => {
  axios.get.mockResolvedValueOnce({
    data: { articles: [newsArticle] }
  });
});

test.skip("renders cards if there are results from the api", () => {
  const search = "?searchTerm=breaks&sources=cnbc";
  const props = {
    setLoadingValue: jest.fn(),
    location: {
      search
    }
  };

  const { getByText, debug } = render(<SearchResults {...props} />);
  debug();
  expect(getByText(`Author: ${newsArticle.author}`)).toBeInTheDocument();
});
test("calls the api when location.search changes", () => {
  const search = "?searchTerm=breaks&sources=cnbc";
  const props = {
    setLoadingValue: jest.fn(),
    location: {
      search
    }
  };

  const { getByText, debug, rerender } = render(<SearchResults {...props} />);
  rerender(
    <SearchResults
      setLoadingValue={() => {}}
      location={{ search: "?searchTerm=dogs&sources=cnbc" }}
    />
  );

  expect(axios.get).toHaveBeenCalledTimes(2);

  //expect(axios.get).toHaveBeenCalledTimes(2)
});

afterEach(() => {
  jest.clearAllMocks();
});
