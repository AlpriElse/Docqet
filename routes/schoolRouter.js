module.exports = function() {
    var express = require('express');
    var router = express.Router();

    router.get(':school', function(req, res, next) {
        console.log(req.params.school);
        res.render('index', { title: 'Express' });
    });

    return router;
}
