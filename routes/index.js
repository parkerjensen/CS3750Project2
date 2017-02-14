var bcrypt = require('bcryptjs');
var express = require('express');

var models = require('../models');
//var utils = require('../utils');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Render the registration page.
 */
router.get('/register', function(req, res) {
  //res.render('register.jade', { csrfToken: req.csrfToken() });
  res.render('register.jade');
});

/**
 * Render the login page.
 */
router.get('/login', function(req, res) {
  res.render('login.jade');
  //res.render('login.jade', { csrfToken: req.csrfToken() });
});

/**
 * Log a user out of their account, then redirect them to the home page.
 */
router.get('/logout', function(req, res) {
  if (req.session) {
    req.session.reset();
  }
  res.redirect('/');
});

router.get('/chat', function(req, res) {
  if (req.session) {
    res.render('chat', { title: 'This is a test chat page.' });
  }
})

module.exports = router;