import axios from "axios";

export default (path) => {
  const link = `https://newsapi.org/v2/top-headlines?sources=${path}&apiKey=844f83db9ed44325a55725ad85a1592c`;
  console.log(link);
  return axios.get(link);
};
