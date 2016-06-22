module.exports = function(passport) {
        passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            //  Check in mongo if a user with username exists or not
            User.findOne({'username':username},
                function(err, user) {
                    //  In the case of any error, return using the done method
                    if(err) return done(err);

                    //  Username does not exist, log error & redirect back
                    if(!user) {
                        console.log('User Not Found with username ' + username);
                    }

                    //  User exists but wrong password, log the error
                    if(!ValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false,
                            req.flash('message','Invalid Password'));
                    }

                    //  User and password both match, return user
                    //  from done method which will be treated like success
                    return done(null, user);
                })
        }))
};
var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}
