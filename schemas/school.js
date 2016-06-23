var mongoose = require('mongoose');

module.exports = mongoose.model('School',{
    schoolName: {type: String, required: true},
    adminEmail: {type: String, required: true},
    adminPassword: {type: String, require: true},
    calendar: {type: Array, default: []},
    eventList: {type: Array, default: []},
    schedules: {type: Array, default: []},
    changeLog: {type: Array, default: []}
});
