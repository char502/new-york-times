import axios from "axios";

const baseUrl = "https://newsapi.org/v2";
const API_KEY = "174fa93fc630400bb21846743dcc5f64";

export const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${API_KEY}`;

  return axios.get(link);
};

export const getSearchNews = (searchTerm) => {
  const link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${API_KEY}`;

  return axios.get(link);
};
