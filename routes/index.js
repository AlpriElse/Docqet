module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');
    var path = require('path');

    var LocalStrategy = require('passport-local').Strategy;

    //  URL: /

    router.get('/',function(req, res) {
        res.sendFile(path.join(__dirname ,'../public','index.html'));
    });

    //  Logout Handler
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //  POST Login Page & Process with Passport
    var login = require('../passport/login.js')(passport);
    /*router.post('/login',
        passport.authenticate('login', {
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash: true
    }));*/
    router.post('/login', function(req,res,next) {
        passport.authenticate('login', function(err, user, info) {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.send({success: false});
            }
            req.login(user,loginErr => {
                if(loginErr) {
                    return next(loginErr);
                }
                return res.send({success: true});
            });
        })(req,res,next);
    });

    //  POST Signup page & Process with Passport
    var signup = require('../passport/signup.js')(passport);
    router.post('/signup', function(req,res,next) {
        passport.authenticate('signup', function(err, newUser, info) {
            if(err) {
                return next(err);
            }
            if(!newUser) {
                return res.send({success: false});
            }
            req.login(newUser,loginErr => {
                if(loginErr) {
                    return next(loginErr);
                }
                return res.send({success: true});
            });
        })(req,res,next);
    });

    //  GET Create School Page
    router.get('/createSchool', function(req, res) {
        res.render('admin/createSchool', {
            user: req.user
        });
    });

    //  POST Create School Page & Add to Database
    router.post('/createSchool', function(req,res) {
        var School = require('../schemas/school.js');
        var User = require('../schemas/user.js');
        User.findOne({_id: req.user._id},function(err,user) {
            if(err) return done(err);
            if(!user) {
                console.log('Couldnt find school.');
                res.send('Couldnt find user.');
            } else {
                if(user.schoolAffiliation) {
                    console.log('Error: You have already created a school');
                    res.send('You have already created a school!');
                } else {
                    School.findOne({ link: req.body['schoolLink']}, function(err, school) {
                            if(err) return done(err);
                        if(school) {
                            console.log('School Already Exists');
                            res.send('Error: School Already Exists');
                        } else {
                            var newSchool = new School();
                            newSchool.name = req.body['schoolName'];
                            newSchool.link = req.body['schoolLink'];
                            newSchool.admin = req.user._id;
                            var tokens = newSchool.name.toLowerCase().split(" ");
                            var completeTokens = [];
                            for (var i = 0; i < tokens.length; i++) {
                                for (var q = 0; q <= i; q++) {
                                    completeTokens.push(tokens.slice(q, tokens.length - i + q).join(" "));
                                }
                            }
                            newSchool.tokens = completeTokens;

                            newSchool.save(function(err) {
                                if(err) {
                                    console.log('Error in Saving school: ' + err);
                                    throw err;
                                }
                                //  Add School ID to User
                                user.schoolAffiliation = newSchool._id;
                                user.save(function(err) {
                                    if(err) {
                                        console.log('Error adding school to user ' + err);
                                        throw err;
                                    }
                                    console.log('School Creation Succesful');
                                    res.send('School Created');
                                });
                            });
                        }
                    });
                }
            }
        });
    });

    //  URL: /home
    router.get('/home', function(req,res) {
        var User = require('../schemas/user.js');
        var School = require('../schemas/school.js');
        if(!req.user) {
            res.redirect('/');
            console.log('no user');
            return;
        }
        User.findOne({email: req.user.email}, function(err, user) {
            var School = require('../schemas/school.js');
            if(err) return done(err);
            School.findOne({_id: req.user.schoolAffiliation}, function(err, school) {
                if(err || !school) {
                    console.log('School lookup error!');
                    res.render('home', {
                        user: req.user,
                        school: undefined
                    });
                } else {
                    delete school.admin
                    res.render('home', {
                        user: req.user,
                        school: school
                    });
                }
            });
        });
    });

    //  Get Specific Manage School Page
    router.get('/addSchedule/:school', function(req, res) {
        var School = require('../schemas/school.js');
        School.findOne({_id: req.user.schoolAffiliation}, function(err, school) {
            if(err || !school) {
                console.log('School lookup error!');
                res.render('admin/addSchedule', {
                    user: req.user,
                    school: undefined
                })
            } else {
                delete school.admin
                res.render('admin/addSchedule', {
                    user: req.user,
                    school: school
                });
            }
        });
    });

    //  POST New schedule
    router.post('/addSchedule/:school', function(req, res) {
        var School = require('../schemas/school.js');
        var moment = require('moment');

        var schedule = {};
        schedule.name = req.body.scheduleName;
        schedule.sections = [];
        req.body.sections.forEach(function(val, idx, arr) {
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
                return
            }
            if(!req.user || (String(school.admin) != String(req.user._id))) {
                res.send('not authorized');
                console.log('not authorized');
                return
            }
            school.schedules.push(schedule);
            school.save(function(err) {
                if(err) {
                    console.log('Error adding Schedule ') + schedule.name;
                    res.send('err');
                    return
                } else {
                    res.send('success');
                    return
                }
            });
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
                delete school.admin
                res.render('home', {
                    'school':school
                })
            }
        });
    });

    return router;
}
