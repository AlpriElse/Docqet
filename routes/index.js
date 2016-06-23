module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');

    var LocalStrategy = require('passport-local').Strategy;
    var login = require('../passport/login.js')();
    var signup = require('../passport/signup.js')();

    //  URL: /
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    //  URL: /about
    router.get('/about', function(req, res, next) {
        res.render('index', { title: 'About' });
    });

    //  GET Login Page
    router.get('/login', function(req, res) {
        res.render('login', {});
    });

    //  Handle Login Post Request
    router.post('/login', function() {
        passport.authenticate('login', {
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash: true
        })
    });

    //  GET Regisration page
    router.get('/signup', function(req, res) {
        res.render('signup',{})
    });

    //  GET Regisration page
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    //  URL: /schoolName
    router.get('/:school', function(req,res,next) {
        console.log(req.user);
        res.render('home', {
            'title':req.params.school,
            'pageData': {
                'calendarFilepath':'/static/data/calendar.json',
                '_UI_IDs': {
                    'time':'#time',
                    'date':'#date',
                    'dayType':'#dayType',
                    'section':'#section',
                    'countdown':'#countdown'
                }
            }
        })
    });

    return router;
}


var _getSchools = function() {
    var schoolSchema = require('../schemas/school.js');
    schoolSchema.find(function(err, schools) {
        if(err) {
            console.log(err);
            res.status(500).json({status: 'failure'});
        } else {
            return schools;
        }
    });
}
