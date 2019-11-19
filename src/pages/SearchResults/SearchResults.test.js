import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { SearchResults } from "./index";
jest.mock("axios");
describe("SearchResults Component", () => {
  const search = "?searchTerm=breaks&sources=cnbc";
  const url = `/search${search}`;
  const props = {
    setLoadingValue: jest.fn(),
    location: {
      search
    }
  };
  axios.get.mockResolvedValueOnce({
    data: { results: [] }
  });
  const { debug, getByText } = render(<SearchResults {...props} />);
  it("shows no results", () => {
    expect(getByText("No Search Results Found")).toBeInTheDocument();
  });
});
