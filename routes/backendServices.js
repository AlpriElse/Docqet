module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');

    router.post('/checkEmail', function(req, res) {
        var User = require('../schemas/user.js');
        User.findOne({email: req.body.email}, function(err, user) {
            if(err) {
                console.log(err);
                done(err);
            }
            res.send(user ? false:true);
        });
    });
    router.post('/checkBetakey', function(req,res) {
        /*  Not Implemented yet */
        res.send(true);
    });
    router.post('/checkSchoolName', function(req,res) {
        res.send('not implemented yet.');
    });
    
    router.post('/findSchool', function(req, res) {
        var School = require('../schemas/school.js');
        School.find({tokens: new RegExp('^' + req.body.schoolSearch, "i")}, function(err, schools) {
           if (err) {
               console.log(err);
               done(err);
           } else {
            res.send(schools);
           }
        });
    });

    return router;
}
