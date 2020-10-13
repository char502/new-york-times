const express = require('express');
const app = express();
const axios = require('axios')


app.get('/top-headlines', async (req, res) => {

  const query = req.query;

  const apiHeadlines = await axios(`https://newsapi.org/v2/top-headlines?sources=${path}&apiKey=e536074ef7c645008d563c828c8d4354`);

  res.json(apiHeadlines.data);
})

app.get('/everything', async (req, res) => {
    const query = req.query;
    
    const api = await axios(`https://newsapi.org/v2/everything?q=${'dog'}&apiKey=e536074ef7c645008d563c828c8d4354`);

    res.json(api.data);
})



app.listen(5000, () =>  console.log('Live'))




// React zone


