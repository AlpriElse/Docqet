module.exports = function (passport) {
    var LocalStrategy = require('passport-local').Strategy;
    var flash = require('connect-flash');

    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        findOrCreateUser = function(){
            var User = require('../schemas/user.js');
            // find a user in Mongo with provided username
            User.findOne({'email':email},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false, req.flash('message','User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = createHash(password);
                    newUser.name = req.body['name'];
                    newUser.betakey = req.body['beta key'];
                    newUser.schoolAffiliation = '';

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
}

var createHash = function(password) {
    var bCrypt = require('bcrypt-nodejs');
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
