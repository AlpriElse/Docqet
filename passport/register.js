module.exports = function () {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var flash = require('connect-flash');
    var School = require('../schemas/school.js');

    passport.use('register', new LocalStrategy({
        usernameField: 'schoolName',
        passReqToCallback : true
    },
    function(req, schoolName, password, done) {
        console.log('called');
        findOrCreateSchool = function(){
            // find a user in Mongo with provided username
            School.findOne({'schoolName':schoolName},function(err, school) {
                // In case of any error return
                if (err){
                    console.log('Error in Register: '+err);
                    return done(err);
                }
                // already exists
                if (school) {
                    console.log('School already exists');
                    return done(null, false, req.flash('message','School Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newSchool = new School();
                    // set the user's local credentials
                    newSchool.schoolName = schoolName
                    newSchool.adminEmail = req.body['email'];
                    newSchool.adminPassword = createHash(password);
                    console.log('here');
                    // save the school
                    newSchool.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('School Registration succesful');
                        return done(null, newSchool);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateSchool);
    }));
}

var createHash = function(password) {
    var bCrypt = require('bcrypt-nodejs');
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
