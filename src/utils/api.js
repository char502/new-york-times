import axios from "axios";

const baseUrl = "https://newsapi.org/v2";

export const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.REACT_APP_API_KEY}`;

  return axios.get(link);
};

export const getSearchNews = (searchTerm, sources) => {
  let link = "";
  if (sources) {
    link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.REACT_APP_API_KEY}`;
  } else {
    link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.REACT_APP_API_KEY}`;
  }
  return axios.get(link);
};
