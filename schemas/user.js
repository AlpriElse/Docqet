var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    schoolAffiliation: Schema.ObjectId,
    email: String,
    gender: String,
    address: String
});
