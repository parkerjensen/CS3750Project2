var express = require('express');
var router = express.Router();
var nav = {
        main: {
            link: '/',
            text: 'Main'
        },
        login: {
            link: 'users/login',
            text: 'Log In'
        }, 
        logout: {
            link: 'users/logout',
            text: 'Log Out'
        }, 
        create: {
            link: 'user/create',
            text: 'Create'
        },
        chat: {
            link: 'chat',
            text: 'Chat'
        },
        extra: {
            link: 'extra',
            text: 'Extra'
        }
    }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { nav: nav });
});

module.exports = router;