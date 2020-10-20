const express = require('express');
const router = express.Router();

// http://localhost:3000/redirect?url=http://localhost:3000/
router.get('/redirect', function(req, res) {
  const userURL = req.query.url;
  res.redirect(userURL);
});


module.exports = router;
