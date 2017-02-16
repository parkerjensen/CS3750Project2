var bcrypt = require('bcryptjs');
var express = require('express');
var user = require('../models/modelSetup')

var router = express.Router();
var models = require('../models/modelSetup');

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

router.post('/register', function(req, res) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new user({
    userName:   req.body.userName,
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email,
    password:   hash,
  }, console.log.bind(console, 'set up new user schema'));
  newUser.save(function(err) {
    if (err) {
      var error = 'Something bad happened! Please try again.';

      if (err.code === 11000) {
        error = 'That email is already taken, please try another.';
      }
      res.render('register.jade', { error: error });
    } else {
      req.session.users = newUser;
      req.users = newUser;
      res.locals.user = newUser;
      //user.User.save(function (err) {if (err) console.log ('Error on save!')});
      res.redirect('/login');
    }
  });
});

/**
 * Render the login page.
*/
router.get('/login', function(req, res) {
  res.render('login.jade');
  //res.render('login.jade', { csrfToken: req.csrfToken() });
});

router.post('/login', function(req, res) {
  user.findOne({ email: req.body.email }, 'firstName lastName email password data', function(err, user) {
    if (!user) {
      //res.render('login.jade', { error: "Incorrect email / password.", csrfToken: req.csrfToken() });
      res.render('register.jade', {error: "User doesn't exist."})
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //utils.createUserSession(req, res, user);
        res.redirect('/chat');
      } else {
        //res.render('login.jade', { error: "Incorrect email / password.", csrfToken: req.csrfToken() });
        res.render('login.jade', { error: "Incorrect email / password."});
      }
    }
  });
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