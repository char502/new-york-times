const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')

require('dotenv').config()



// if(process.env.NODE_ENV !== 'production') require('dotenv').config();
// &apiKey=${process.env.react_app_api_key}

app.use(express.static(path.join(__dirname, 'client/build/index.html')));

app.get('/top-headlines', async (req, res) => {

  const query = req.query;

  const apiHeadlines = await axios(`https://newsapi.org/v2/top-headlines?sources=${'bbc-news'}&apiKey=${process.env.react_app_api_key}`);

  res.json(apiHeadlines.data);
})

app.get('/everything', async (req, res) => {
    const query = req.query;
    
    const api = await axios(`https://newsapi.org/v2/everything?q=${'dog'}&apiKey=${process.env.react_app_api_key}`);

    res.json(api.data);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;


app.listen(port, () =>  console.log(`Listening on port ${port}`))













// app.get('/top-headlines', async (req, res) => {

//   const query = req.query;

//   const apiHeadlines = await axios(`https://newsapi.org/v2/top-headlines?sources=${path}&apiKey=e536074ef7c645008d563c828c8d4354`);

//   res.json(apiHeadlines.data);
// })

// app.get('/everything', async (req, res) => {
//     const query = req.query;
    
//     const api = await axios(`https://newsapi.org/v2/everything?q=${'dog'}&apiKey=e536074ef7c645008d563c828c8d4354`);

//     res.json(api.data);
// })



// app.listen(5000, () =>  console.log('Live'))




// React zone




// const express = require('express');
// const app = express();
// const axios = require('axios')

// const port = process.env.PORT || 5000;


// app.get('/top-headlines', async (req, res) => {

//   const query = req.query;

//   const apiHeadlines = await axios(`https://newsapi.org/v2/top-headlines?sources=${'bbc-news'}&apiKey=${process.env.react_app_api_key}`);

//   res.json(apiHeadlines.data);
// })

// app.get('/everything', async (req, res) => {
//     const query = req.query;
    
//     const api = await axios(`https://newsapi.org/v2/everything?q=${'dog'}&apiKey=${process.env.react_app_api_key}`);

//     res.json(api.data);
// })



// app.listen(port, () =>  console.log(`Listening on port ${port}`))




// React zone


