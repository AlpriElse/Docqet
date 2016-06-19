var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/:school', function(req, res, next) {
    var school = req.params.school;
    res.render('home', {
        title: school,
        pageData: {
            calendarFilepath: '/static/data/calendar.json',
            _UI_IDs: {
                section:'#section',
                time:'#time',
                date:'#date',
                dayType:'#dayType',
                countdown:'#countdown',
                nowList: '#nowList',
                upcomingList: '#upcomingList'
            }
        }
    });
});

module.exports = router;
