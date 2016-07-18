module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var flash = require('connect-flash');

    router.get('/operations/checkEmail/:email', function(res, res) {
        console.log('checking...');
        var User = require('../schemas/user.js');
        User.findOne({email: req.params.email}, function(err, user) {
            if(err) {
                console.log(err);
                done(err);
            }
            if(user) res.send(true);
            else res.send(false);
        });
        res.send('called');
    });

    return router;
}
