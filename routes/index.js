
const express = require('express');
const router = express.Router();

const command = require('./command');
const files = require('./files')
const rce = require('./rce');
const ssti = require('./ssti');
const xml = require('./xml');
const user = require('./user');
const xss = require('./xss');

// the following is vulnerable to a format string injection. The following places a `NaN` in the logs: `http://localhost:3000/test?format=%f`
router.all('/', function(req, res, next) {
  const ip = req.connection.remoteAddress;
  console.log("URL: " + req.url, ip);
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Home', name: req.query.name, usercontent: req.query.usercontent});
});



// /* GET lfi. */
// router.get('/lfi', function(req, res) {
//   res.render('lfi', { title: 'Home', file: req.query.file});
// });

router.use(command);
router.use(files);
router.use(rce);
router.use(ssti);
router.use(xml);
router.use(xss);

module.exports = router;
