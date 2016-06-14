module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
      //res.render('index', { title: 'Express' });
      res.render('default', {title:'Home'});
    });

    return router
}
