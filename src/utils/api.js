import axios from "axios";

const baseUrl = "https://newsapi.org/v2";
const API_KEY = "844f83db9ed44325a55725ad85a1592c";

export const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${API_KEY}`;

  return axios.get(link);
};

export const getSearchNews = (searchTerm) => {
  const link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${API_KEY}`;

  return axios.get(link);
};
