const express = require("express");
const cors = require("cors");
const port = 5000;
// const axios = require("axios");

const { getNews, getSearchNews } = require("./api");

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  const { sources, search } = req.query;

  console.log(req);

  if (search) {
    getSearchNews(search, sources).then(({ data }) => {
      return res.json({ data: data.articles });
    });
  } else {
    getNews(req.query.sources).then(({ data }) => {
      return res.json({ data: data.articles });
    });
  }
});

app.listen();

// app.listen(port, () => console.log(`Example app listening on port ${port} `));

// const express = require("express");
// const fetch = require("node-fetch");
// // let request = require("request");
// var apiCalls = require("../src/utils/api");
// const app = express();
// const port = 5000;

// app.get('/wf', wf.foo );

// app.get("/apiCalls", apiCalls.getNews);
// app.get("/apiCalls", apiCalls.getSearchNews);

// app.get("/apiCalls", (req, res) => {
//   console.log(`request object is ${req}, response object is ${res}`);
// });

// app.get("//newsapi/everything", (req, res) => {
//   request(
//     "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=The key here",
//     function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         // console.log(body);
//         // let parsedBody = JSON.parse(body);
//         res.send(body);
//       }
//     }
//   );
// });

// res.send("Hello World"));

// app
//   .route("/newsapi")
//   .all((req, res, next) => {
//     //Any auth method required
//     next();
//   })
//   .get(async (req, res, next) => {
//     const url = req.originalUrl.replace("/newsapi", "");
//     return fetch(
//       `${news_api_host}${url}&apiKey=${process.env.react_app_api_key}`
//     );
//   })
//   .post(async (req, res, next) => {
//     // whatever post API instructions you might have
//   });

// app.get("/", (req, res) => res.send("Hello World"));
// app.get("//newsapi/everything", (req, res) => {
//   request(
//     "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=The key here",
//     function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         // console.log(body);
//         // let parsedBody = JSON.parse(body);
//         res.send(body);
//       }
//     }
//   );
// });

// res.send("Hello World"));

// app.listen(port, () => console.log(`Example app listening on port ${port} `));
