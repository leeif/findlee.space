var express = require('express');
var redis = require('./redis');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var session = require('express-session');
var http = require('http');
var debug = require('debug')('findlee.space:server');
var routes = require('./routers');
var db = require('./modelsWrapper');
var middlewares = require('./middlewares');
var app = express();
var server = http.createServer(app);
var env = process.env.NODE_ENV || 'development';
var config = require('./config/app')[env];

app.set('env', env);
app.set('host', config.host);
app.set('port',config.port);
app.enable('trust proxy');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(busboy({
  limits: {
    fileSize: 3 * 1024 * 1024 //3MB
  }
}));
app.use(cookieParser());
app.use(session({
  secret: 'findlee.space',
    resave: config.session.resave,
    cookie: {
      maxAge: config.session.maxAge,
      domain: config.session.domain
    }
}));
app.use(express.static(path.join(__dirname, 'public/')));
//middlewares that attach db  connection to request object
app.use(middlewares.attachDB(db));
//attach redis to the request object
app.use(middlewares.attachRedis(redis));

// register router in app.
if(app.get('env') !== 'test'){
  app.use(/\/blog\/admin(?!\/login$).*/, middlewares.requireLogin());
}
app.use(/\/blog(?!\/api.*).*/, middlewares.blogVistor());
app.use('/', routes);

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
      status: err.status,
      message: err.message
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    status: err.status,
    message: err.message
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//websocket

//httpserver
server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);
server.on('disconnect', onDisconnect);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + app.get('port') :
    'Port ' + app.get('port');

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

function onDisconnect() {
  console.log('app stop');
  db.end();
}
