var mongoose = require('mongoose');

module.exports = mongoose.model('School',{
    "School Name": {type: String, required: true},
    "Admins": {type: Array, required: true},
    "Calendar": {type: Array, default: []},
    "Event List": {type: Array, default: []},
    "Schedules": {type: Array, default: []},
    "Change Log": {type: Array, default: []}
});
