// const axios = require("axios");
import axios from "axios";

// const baseUrl = "https://newsapi.org/v2";

const baseUrl = "http://localhost:5000/everything"

export const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.react_app_api_key}`;
  return axios.get(link);
};

export const getSearchNews = (searchTerm, sources) => {
  let link = "";
  if (sources) {
    link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.react_app_api_key}`;
  } else {
    link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.react_app_api_key}`;
  }
  return axios.get(link);
};