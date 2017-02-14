var express = require('express');
var router = express.Router();
//var models = require('../models');

router.post('/login', function(req, res) {
  user.findOne({ email: req.body.email }, 'firstName lastName email password data', function(err, user) {
    if (!user.user) {
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.jade', { title: 'This is the login page.' });
});

module.exports = router;