module.exports = function() {
    //  Load Modules
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    //  Set Router File-paths
    var routes = require('./routes/index');
    var users = require('./routes/users');

    //  Initialize App
    var app = express();

    //  Set-Up View Engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // ???
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));

    //  Router Hand-off
    //app.use(express.static('public'));

    app.use('/', routes);
    app.use('/users', users);

    app.use('/static', express.static('public'));


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });


    return app
}
