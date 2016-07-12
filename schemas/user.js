var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User',{
    name: {type: String, required: true },
    password: {type: String, required: true},
    schoolAffiliation: {type: String, default: undefined},
    email: {type: String, required: true},
    betakey: {type: String, required: true}
});
