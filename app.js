var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var csrf = require('csurf');
var session = require('client-sessions');
var mongoose = require('mongoose');

var middleware = require('./middleware');
//var utils = require('./utils');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var chat = require('./routes/chat');
var register = require('./routes/register');

var app = express();

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
/*
module.exports.createUserSession = function(req, res) {
  var cleanUser = {
    firstName:  user.firstName,
    lastName:   user.lastName,
    email:      user.email,
    data:       user.data || {},
  };

  req.session.user = cleanUser;
  req.user = cleanUser;
  res.locals.user = cleanUser;
};
 */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chatroom');
require('./models');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', console.log.bind(console, 'connected to database'));

// setting
app.set('view engine', 'jade');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookieName: 'session',
    requestKey: 'ourSessionKey',
    secret: 'keyboard cat',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

//app.use(csrf());
app.use(middleware.simpleAuth);

// routes
app.use('/', index);
app.use('./routes/chat', chat);
app.use('./routes/login', login);
app.use('./routes/users', users);
app.use('./routes/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;