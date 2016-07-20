
module.exports = function(passport) {
    var LocalStrategy = require('passport-local').Strategy;
    var flash = require('connect-flash');

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        //  Check in mongo if a user with username exists or not
        var User = require('../schemas/user.js');
        User.findOne({'email':email}, function(err, user) {
            //  In the case of any error, return using the done method
            if(err) return done(err);

            //  Username does not exist, log error & redirect back
            if(!user) {
                console.log('User Not Found with email ' + email);
                return done(null, false,
                    req.flash('message', 'User Not found.'));
            } else {
                //  User exists but wrong password, log the error
                if(!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message','Invalid Password'));
                }

                //  User and password both match, return user
                //  from done method which will be treated like success
                return done(null, user);
            }
        })
    }))
};
var isValidPassword = function(user, password) {
    var bCrypt = require('bcrypt-nodejs');
    return bCrypt.compareSync(password, user.password);
}
