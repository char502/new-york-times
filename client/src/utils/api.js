import axios from "axios";

// const baseUrl = "https://newsapi.org/v2";

// const baseUrl = "http://localhost:5000/everything"

const baseUrl = "http://localhost:5000"


export const getNews = (path) => {
  // const link = `${baseUrl}/top-headlines?sources=${path}&apiKey=${process.env.react_app_api_key}`;
  // return axios.get(link);

  const link = `${baseUrl}?sources=${path}`

  return axios.get(link).then(response => response.data);
};

export const getSearchNews = (searchTerm, sources) => {
  // let link = "";
  // if (sources) {
  //   link = `${baseUrl}/everything?q=${searchTerm}&sources=${sources}&apiKey=${process.env.react_app_api_key}`;
  // } else {
  //   link = `${baseUrl}/everything?q=${searchTerm}&apiKey=${process.env.react_app_api_key}`;
  // }


  let link = "";
  if (sources) {
    link = `${baseUrl}?q=${searchTerm}&sources=${sources}`;
  } else {
    link = `${baseUrl}?q=${searchTerm}`;
    console.log(link)
  }

  return axios.get(link).then(response => response.data);
  
};


