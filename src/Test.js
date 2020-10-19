// http://localhost:5000/api



import React, { useState, useEffect, useContext } from "react";

// import { getNews } from "../src/utils/api";

// import { getNews } from "../src/utils/api";

// const port = process.env.PORT || 5000;



const Test = () => {
  const [articles, setArticles] = React.useState([]);
  const [sources, setSources] = React.useState("engadget");

 const fetchNews = () => {
    setArticles([])
    fetch(`http://localhost:5000?sources=${sources}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setArticles(data);
      });
  };

  // getNews('abc-news')

  // const fetchNews = () => {
  //   setArticles([]);
  //   fetch(`http://localhost:${port}/newsapi?sources=${sources}`)
  //     .then((res) => res.json())
  //     .then(({ data }) => {
  //       setArticles(data);
  //     });
  // };

  // let result = articles.map((article) => {
  //   console.log(article)
  // })
 
  // for (let item in articles.array) {
  //   console.log(item)
  //   }
  

  
  

  console.log(articles);

  // let result = articles[2].map((item) => {
  //   return item
  // })

  // console.log(result)


  return (
    
    <div>
      <h3>This is a test</h3>
      Sources:
      <select onChange={(e) => setSources(e.target.value)}>
        <option value="engadget">Engadget</option>
        <option value="aftenposten">Aftenposten</option>
      </select>
      <br />
      <br />
      <button onClick={fetchNews} disabled={!sources.length}>
        Get news
      </button>
      {articles.map((article) => (
        <div>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
      {/* Sources:
      <select onChange={(e) => setSources(e.target.value)}>
        <option value="engadget">Engadget</option>
        <option value="aftenposten">Aftenposten</option>
      </select>
      <br />
      <br />
      <button onClick={fetchNews} disabled={!sources.length}>
        Get news
      </button>
      {articles.map((article) => (
        <div>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Test;