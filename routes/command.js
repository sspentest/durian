const express = require('express');
const router = express.Router();

const cp = require('child_process');

// http://localhost:3000/rce?args=whoami
router.get('/command', function(req, res) {
    res.send(cp.execSync(req.query.args).toString());
});


module.exports = router;
