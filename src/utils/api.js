// const axios = require("axios");
import axios from "axios";

const baseUrl = "https://newsapi.org/v2";

export const getNews = (path) => {
  const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.react_app_api_key}`;
  return axios.get(link);
};

export const getSearchNews = (searchTerm, sources) => {
  let link = "";
  if (sources) {
    link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.react_app_api_key}`;
  } else {
    link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.API_KEY}`;
  }
  return axios.get(link);
};

// module.exports = {
//   getNews,
//   getSearchNews,
// };

// import axios from "axios";

// const baseUrl = "https://newsapi.org/v2";

// const headlines = "/top-headlines?sources";

// export const getNews = (path) => {
//   // const link = `apiCall/`

//   const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.react_app_api_key}`;

//   const apiCall = link;

//   console.log(link);
//   return axios.get(link);
// };

// export const getSearchNews = (searchTerm, sources) => {
//   let link = "";
//   if (sources) {
//     link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.react_app_api_key}`;
//   } else {
//     link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.react_app_api_key}`;
//   }
//   return axios.get(link);
// };
