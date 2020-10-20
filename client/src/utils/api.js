import axios from "axios";

const baseUrl = "/newsDataApi/"


export const getNews = (path) => {
  const link = `${baseUrl}?sources=${path}`
  return axios.get(link).then(response => response.data);
};

export const getSearchNews = (searchTerm, sources) => {

  let link = "";
  
  if (sources) {
    link = `${baseUrl}?q=${searchTerm}&sources=${sources}`;
  } else {
    link = `${baseUrl}?q=${searchTerm}`;
    console.log(link)
  }
  return axios.get(link).then(response => response.data);
};


