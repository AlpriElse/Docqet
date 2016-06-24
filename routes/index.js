module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');

    var LocalStrategy = require('passport-local').Strategy;

    //  URL: /
    router.get('/', function(req, res, next) {
        res.render('index', {user: req.user, title: 'Express' });
    });

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //  URL: /home
    router.get('/home', function(req,res) {
        res.render('home', {user: req.user});
    });

    //  URL: /about
    router.get('/about', function(req, res, next) {
        res.render('index', {user: req.user, title: 'About' });
    });

    //  GET Login Page
    router.get('/login', function(req, res) {
        if(req.user) res.redirect('/home');
        res.render('./user/login', {});
    });

    //  POST Login Page
    var login = require('../passport/login.js')(passport);
    router.post('/login',
        passport.authenticate('login', {
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash: true
    }));

    //  GET Signup page
    router.get('/signup', function(req, res) {
        if(req.user) res.redirect('/home');
        res.render('./user/signup',{});
    });

    //  POST Signup page
    var signup = require('../passport/signup.js')(passport);
    router.post('/signup',
        passport.authenticate('signup', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
    }));

    //  GET Create School Page
    router.get('/createSchool', function(req, res) {
        res.render('admin/createSchool');
    });

    //  POST Create School Page
    var createSchool = require('../operations/createSchool.js');
    router.post('/createSchool',function(req,res) {
        var School = require('../schemas/school.js');
        var newSchool = new School();
        console.log(req.params);
        newSchool.name = req.body['schoolName'];
        newSchool.link = req.body['schoolLink'];
        newSchool.admins = [req.user._id];

        newSchool.save(function(err) {
            if(err) {
                console.log('Error in Saving school: ' + err);
                throw err;
            }
            console.log('School Creation Succesful');
        });
        res.send(ok);
    });

    //  URL: /schoolName
    router.get('/:school', function(req,res,next) {
        var School = require('../schemas/school.js');
        School.find({schoolLink:req.params.school}, function(err, school) {
            if (err){
                console.log('Error finding school: '+ err);
                res.sendStatus(500);
            }
            if(school) {

            }
        });
        res.render('home', {
            'title':req.params.school,

        })
    });

    //  URL: /schoolName


    return router;
}
