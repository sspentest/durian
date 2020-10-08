
const express = require('express');
const router = express.Router();

const command = require('./command');
const fileUpload = require('./file-upload')
const rce = require('./rce');
const ssti = require('./ssti');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Home', name: req.query.name, usercontent: req.query.usercontent});
});

/* GET lfi. */
router.get('/lfi', function(req, res) {
  res.render('lfi', { title: 'Home', file: req.query.file});
});

router.use(command);
router.use(fileUpload);
router.use(rce);
router.use(ssti);

module.exports = router;
