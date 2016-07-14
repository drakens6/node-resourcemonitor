'use strict';
var express = require('express'),
     app = express();
var http = require('http').Server(app);
//var path = require('path');
var bodyParser = require('body-parser');

var swig  = require('swig');
var controller = require('./app/controllers/server.controller.js');
var sandbox = require('./app/controllers/sandbox.js');

app.set('view engine', 'html');
app.set('view options', {
    layout: false
});

app.engine('html', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/sandbox',sandbox.getProcess);
app.get('/',controller.index);

var server = app.listen('3010', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at port:'+ port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 //   res.status(404).send({error:'url not found'});
    var err = new Error(req.path + ' Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
       console.log(err);
    });
}

process.on('uncaughtException', function (err) {
    console.log(err);
});

module.exports = app;

