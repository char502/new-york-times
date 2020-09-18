// http://localhost:5000/api

import React, { useState, useEffect, useContext } from "react";

const Test = () => {
  const [articles, setArticles] = React.useState([]);
  const [sources, setSources] = React.useState("engadget");

  const fetchNews = () => {
    setArticles([]);
    fetch(`http://localhost:5000/api?sources=${sources}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setArticles(data);
      });
  };

  console.log(articles);

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
