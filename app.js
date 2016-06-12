

module.exports = function() {
    //  Modules
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    //  Router Objects
    var routes = require('./routes/index')();
    var users = require('./routes/users');

    //  App Initialization
    var app = express();
    app.set('port', process.env.PORT || 3000);

    // View Engine Initialization
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //  ????????
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //  Router Hand-off
    app.use('/', routes);
    app.use('/users', users);

    //  Catch 404 and Forward to Error Handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    return app;
}
