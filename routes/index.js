module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');

    var LocalStrategy = require('passport-local').Strategy;

    //  URL: /
    router.get('/', function(req, res, next) {
        res.render('index', {user: req.user, title: 'Express' });
    });

    //  Logout Handler
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //  URL: /home
    router.get('/home', function(req,res) {
        var User = require('../schemas/user.js');
        var School = require('../schemas/school.js');
        User.findOne({email: req.user.email}, function(err, user) {
            if(err) return done(err);

        });
        console.log(req.user);
        res.render('home', {
            user: req.user

        });
    });

    //  GET Login Page
    router.get('/login', function(req, res) {
        if(req.user) res.redirect('/home');
        res.render('./user/login', {});
    });

    //  POST Login Page & Process with Passport
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

    //  POST Signup page & Process with Passport
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

    //  POST Create School Page & Add to Database
    router.post('/createSchool', function(req,res) {
        var School = require('../schemas/school.js');
        School.findOne({ link: req.body['schoolLink']}, function(err, school) {
            if(err) return done(err);
            if(school) {
                console.log('School Already Exists');
                res.send('Error: School Already Exists');
            } else {
                var newSchool = new School();
                newSchool.name = req.body['schoolName'];
                newSchool.link = req.body['schoolLink'];
                newSchool.admins = [req.user._id];

                newSchool.save(function(err) {
                    if(err) {
                        console.log('Error in Saving school: ' + err);
                        throw err;
                    }
                    console.log('School Creation Succesful');
                    res.send('School Created');
                });
            }
        });
    });

    //  Get Manage School Page
    router.get('/manageSchool', function(req, res) {
        var School = require('../schemas/school.js');
        School.find({admins: req.user._id}, function(err, schools) {
            if(err) return done(err);
            res.render('admin/manageSchool', {
                user: req.user,
                schools: schools
            });
        })
    });

    //  Get Specific Manage School Page
    router.get('/manageSchool/:school', function(req, res) {
        var School = require('../schemas/school.js');
        res.render('admin/addSchedule', {
            user: req.user,
            school: req.params.school
        });
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
                delete school.admins
                res.render('home', {
                    'title':req.params.school,
                    'school':school
                })
            }
        });

    });

    //  POST New schedule
    router.post('/manageSchool/:school/addSchedule', function(req, res) {
        var School = require('../schemas/school.js');
        var moment = require('moment');

        var schedule = {};
        schedule.name = req.body.name;
        schedule.sections = [];
        req.body.schedule.forEach(function(val, idx, arr) {
            schedule.sections.push({
                name: val.name,
                start: moment(val.start,'HH:mm').format('HH:mm'),
                end: moment(val.end,'HH:mm').format('HH:mm')
            });
        });
        School.findOne({'link':req.params.school}, function(err, school) {
            if(err) {
                console.log('Error finding school: ' + err);
                res.sendStatus(500);
            }
            if(!req.user || !school.admins.includes(req.user._id)) {
                res.send('not authorized');
            } else if(school) {
                school.schedules.push(schedule);
                school.save(function(err) {
                    if(err) {
                        console.log('Error adding Schedule ') + schedule.name;
                        res.send('err');
                        throw err;
                    }
                    res.send('success');
                });
            }
        });
    });


    return router;
}
