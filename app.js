const API_KEY = 'nogMSDeDSfMXjp50Iow5Qg==aMqPmJ4yTFpdEx44'
const express = require('express')
const request = require('request');
const cors = require('cors');

const app = express()
const port = 5000
const limit = 20

app.use(cors());

app.get('/', (req, res) => {
  res.send('рабочий путь по /get-car')
})

app.get('/get-car', (req, res) => {
  const model = req.query.model ?? 'camry'

  request.get({
    url: 'https://api.api-ninjas.com/v1/cars?limit=' + limit + '&model=' + model,
    headers: {
      'X-Api-Key': API_KEY
    },
  }, function(error, response, body) {
    if(error) return res.status(500).send('Request failed: ' + error);
    else if(response.statusCode != 200) return res.status(response.statusCode).send('Error: ' + body.toString('utf8'));
    else res.send(body);
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



