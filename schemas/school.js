var mongoose = require('mongoose');

module.exports = mongoose.model('School',{
    name: {type: String, required: true},
    link: {type: String, required: true},
    admins: {type: Array, required: true},
    calendar: {type: Array, default: []},
    eventList: {type: Array, default: []},
    schedules: {type: Array, default: []},
    changeLog: {type: Array, default: []}
});
