const express = require('express');
const router = express.Router();
const {join} = require('path');
const {readdirSync} = require('fs');

const UPLOADS = join(__dirname, '../uploads');

/* GET upload page. */
router.get('/file/upload', function(req, res) {

  const files = readdirSync(UPLOADS).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

  res.render('upload', { title: 'Upload', files: files});
});

router.post('/file/upload', function(req, res) {
  let file = req.files.file;
  const mvPath = join(UPLOADS, file.name);
  file.mv(mvPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
      
    res.redirect('/upload');
  });

});


router.get('/file/download/:name', function (req, res, next) {
  var options = {
    root: join(__dirname, '..'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

module.exports = router;