var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'This is the login page.' });
});

router.get('/create', function(req, res, next) {
  res.send('create account');
});


module.exports = router;
