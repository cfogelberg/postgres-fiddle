'use strict';

var http = require('http');
var express = require('express');
var compression = require('compression');
var serve_favicon = require('serve-favicon');
var body_parser = require('body-parser');
var method_override = require('method-override');
var errorhandler = require('errorhandler');
var log4js = require('log4js');
var path = require('path');

var C = require('app/config');
var L = require('app/util/logger');
var logger = L.get_logger('app/server');

process.on('uncaughtException', function(error) {
  if(logger) {
    logger.error('Uncaught exception, exiting: ' + error.name + ' ' + error.message);
    logger.error(error.stack);
  }
  else {
    console.error('BACKUP LOG TO CONSOLE IN CASE OF TOTAL SERVER/LOGGER FAILURE:\n' + error.stack);
  }
  process.exit();
});

Error.stackTraceLimit = Infinity;
var app = express();
configure_express_middleware(app);
var http_server = http.createServer(app);
http_server.listen(C.http_port, function() {
  logger.info('Express HTTP server listening on port %d', C.http_port);
});



function configure_express_middleware(app) {
  app.use(compression());
  app.use(serve_favicon(path.join(C.client_root, 'assets', 'images', 'favicons', 'favicon.ico')));
  app.use(log4js.connectLogger(L.get_logger('express'), { level: 'auto', layout: 'basic', format: C.express_logger_format }));
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(method_override('X-HTTP-Method'));          // Microsoft
  app.use(method_override('X-HTTP-Method-Override')); // Google/GData
  app.use(method_override('X-Method-Override'));      // IBM
  app.use('/api', require('app/api/entry/router'));
  app.use('/assets', express.static(path.join(C.client_root, 'assets')));
  app.use('/bower_components', express.static(path.join(C.client_root, 'bower_components')));
  app.use('/js', express.static(path.join(C.client_root, 'js')));
  app.use(function(req, res, next) { // Fall back to always sending index.html
    res.sendFile(path.join(C.client_root, 'index.html'));
  });
  app.use(errorhandler()); // not appropriate for a prod site, see SES / http://calv.info/node-and-express-tips/ for another approach
}
