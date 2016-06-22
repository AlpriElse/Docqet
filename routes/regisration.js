module.exports = function(db) {
    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var bodyParser = require('body-parser')


    router.post('/submit', function(req, res, next) {
        //console.log('hello');
        console.log(req.body['user[name]']);
        var schoolSchema = require('../schemas/school.js');
        var school = new schoolSchema({
            "School Name": req.body['schoolName'],
            "Admins": [
                {
                    "name": req.body['adminName'],
                    "password":req.body['adminPassword']
                }
            ]
        });
        school.save(function(err) {
            if(err) {
                console.log(err);
				res.status(500).json({status: 'failure'});
            } else {
                console.log('saved');
                res.send('done');
            }
        });
    });

    router.get('/', function(req,res, next) {
        res.render('regisration', {});
    });


    return router;
}
