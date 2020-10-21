const express = require('express')
const path = require("path");
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

const {getNews, getSearchNews} = require('./apiData')



app.use(cors())

app.get('/newsDataApi', (req, res) => {
  const {sources, q} = req.query

  console.log(sources, q)

  if (q) {
    getSearchNews(q, sources)
    .then(({data}) => {
      return res.json({data: data.articles})
    })
  } else {
    getNews(sources).then(({data}) => {
      return res.json({data: data.articles})
    })
  }

})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}



app.listen(port, () =>  console.log(`Listening on port ${port}`))