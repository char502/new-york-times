const axios = require("axios");
require("dotenv").config();

const baseUrl = "https://newsapi.org/v2";

const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.react_app_api_key}`;
  return axios.get(link);
};

const getSearchNews = (searchTerm, sources) => {
  let link = "";
  if (sources) {
    link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.react_app_api_key}`;
  } else {
    link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.react_app_api_key}`;
  }
  return axios.get(link);
};

module.exports = {
  getNews,
  getSearchNews,
};
