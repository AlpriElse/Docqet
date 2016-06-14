var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.send('respond with a resource');
=======
  res.render('index', {title: 'respond with a resource'});
>>>>>>> 1b165579544b3db40285eca6c5cc04d0d0a1fd06
});

module.exports = router;
