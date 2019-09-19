import axios from "axios";

// const NewsApiRequest = () => {
//   axios.create({
//     baseURL:
//       "https://newsapi.org/v2/top-headlines?country=gb&apiKey=844f83db9ed44325a55725ad85a1592c"
//   });
// };

// export default NewsApiRequest;

export default axios.create({
  baseURL:
    "https://newsapi.org/v2/top-headlines?country=gb&apiKey=844f83db9ed44325a55725ad85a1592c"
});
