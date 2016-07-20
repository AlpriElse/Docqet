module.exports = function (passport) {
    var LocalStrategy = require('passport-local');

    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback : true
    },function(req,email,password,done) {
        process.nextTick(function() {
            console.log(req.body);
            var User = require('../schemas/user.js');
            User.findOne({email: email}, function(err, user) {
                if(err) {
                    console.log('Sign up error: ' + err);
                    return done(err);
                }
                if(user) {
                    console.log('User already exists');
                    return done(null, false, req.flash({
                        message: 'User already exists',
                    }));
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = createHash(password);
                    newUser.name = req.body.name;
                    newUser.betakey = req.body.betakey;
                    console.log(newUser);
                    newUser.save(function(err){
                        if(err) {
                            console.log('Error saving user: '+ err);
                            done(null, false, req.flash({
                                message: 'Save Error.'
                            }));
                        } else {
                            console.log('User regisration successful');
                            return done(null, newUser);
                        }
                    });
                    return done(null, newUser);
                }
            });
        });
    }));
}

var createHash = function(password) {
    var bCrypt = require('bcrypt-nodejs');
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
