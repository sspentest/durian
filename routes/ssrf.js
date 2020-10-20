const express = require('express');
const router = express.Router();

const {get} = require('http');

// http://localhost:3000/ssrf?url=http://localhost:3000/
router.get('/ssrf', function(req, res) {
  const userURL = req.query.url;
  get(userURL, (response) => { 
    console.log(response);
    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', () => {
      res.send(rawData);
    });

  }).on("error", (err) => {
    throw new Error(err);
  });
});


module.exports = router;
