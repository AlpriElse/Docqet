passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function() {
            //  Find a user in Mongo with provided username
            User.findOne({'username':'username'},function(err, user) {
                //  In case of any error return...
                if(err){
                    console.log('Error in SignUp:'+err);
                    return done(err);
                }

                //  Already exists
                if(user) {
                    console.log('User Already Exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    //  If there is no user with that email

                    //  Create the user
                    var newUser = new User({
                        'username':username,
                        'password':createHash(password),
                        'email':req,param('email'),
                        'firstName':req.param('firstName'),
                        'lastName':req.param('lastName')
                    });

                    //  Save the User
                    newUser.save(function(err) {
                        if(err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Regisration successful');
                        return done(null, newUser);
                    });

                }

            });
        };
        //  Delay the execution of findOrCreate User and execute
        //  the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }
))
var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
