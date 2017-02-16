var express = require('express');
var router = express.Router();
var navStuff = require('./modules/navItems.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { nav: navStuff });
});

module.exports = router;