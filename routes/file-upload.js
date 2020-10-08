const express = require('express');
const router = express.Router();
const {join} = require('path');
const {readdirSync} = require('fs');

const UPLOADS = '../uploads';

/* GET upload page. */
router.get('/upload', function(req, res) {

  const files = readdirSync(join(__dirname, UPLOADS))

  res.render('upload', { title: 'Upload', files: files});
});

const uploadsDir = join(__dirname, );

router.post('/upload', function(req, res) {
  let file = req.files.file;
  const mvPath = join(UPLOADS, file.name);
  file.mv(join(__dirname, mvPath), function(err) {
    if (err) {
      return res.status(500).send(err);
    }
      
    res.redirect('/upload');
  });

});

module.exports = router;