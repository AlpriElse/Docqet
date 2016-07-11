var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School',{
    name: {type: String, required: true},
    link: {type: String, required: true},
    admin: {type: Schema.ObjectId, required: true},
    calendar: {type: Array, default: []},
    eventList: {type: Array, default: []},
    schedules: {type: Array, default: []},
    changeLog: {type: Array, default: []}
});
