
const express = require('express');
const router = express.Router();

const Secrets = require('../lib/secrets');

const secret = Math.random().toString(36).substr(2);
const encSec = new Secrets('des-ede3-cbc', secret);

class User {

    constructor(userid, email, password) {
        this.userid = userid;
        this.email = email;
        this.passEnc = encSec.encrypt(password);
    } 
}

const users = [new User('joe', 'joe@example.com', 'password')];

// list all users
router.get('/user', function(req, res) {
    res.json(users);
});

// create a user
router.post('/user', function(req, res) {
    users.push(new User(req.body.userid, req.body.email, req.body.password))
    res.json(users[user.length - 1])
});

// list a user
router.get('/user/:id', function(req, res) {
    const id = parseInt(req.params.id, 10);
    res.json(id);
});

// update a user
router.patch('/user/:id', function(req, res) {
    const id = parseInt(req.params.id, 10);
    res.json();
});

// delete a user
router.delete('/user/:id', function(req, res) {
    const id = parseInt(req.params.id, 10);
    res.json();
});

module.exports = router;
