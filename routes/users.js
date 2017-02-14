var express = require('express');
var router = express.Router();

/* GET users login page. */
router.get('/login', function(req, res, next) {
  res.render('login resond with a resource');
});

router.post('/login', function(req, res) {
  models.User.findOne({ email: req.body.email }, 'firstName lastName email password data', function(err, user) {
    if (!user) {
      //res.render('login.jade', { error: "Incorrect email / password.", csrfToken: req.csrfToken() });
      res.render('login.jade', { error: "Incorrect email / password."});
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

/* GET users register page. */
router.get('/register', function(req, res, next) {
  res.render('/register', { title: 'Registration Page.' });
});

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post('/register', function(req, res) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var user = new models.User({
    userName:   req.body.userName,
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email,
    password:   hash,
  });
  user.save(function(err) {
    if (err) {
      var error = 'Something bad happened! Please try again.';

      if (err.code === 11000) {
        error = 'That email is already taken, please try another.';
      }
      res.render('register.jade', { error: error });
    } else {
      var nUser = new cleanUser ({
          userName:   user.userName,
          firstName:  user.firstName,
          lastName:   user.lastName,
          email:      user.email,
          data:       user.data || {},
      });

      req.session.user = nUser;
      req.user = nUser;
      res.locals.user = nUser;
      nUser.save(function (err) {if (err) console.log ('Error on save!')});
      res.redirect('/chat');
    }
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;