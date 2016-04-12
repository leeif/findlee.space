var express = require('express');
var mysql = require('mysql');
var redis = require('redis');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var attachDB = require('./middlewares/AttachDB');
var attachRedis = require('./middlewares/AttachRedis');
var requireLogin = require('./middlewares/RequireLogin');
var http = require('http');
var debug = require('debug')('findlee.space:server');
var routes = require('./routers');
var config = require('./config/Config');
var WsServer = require('./websocket/WsServer');
var app = express();
var server = http.createServer(app);
var wsServer;
var sess;

// create connection of database
var db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectionLimit: config.db.connectionLimit,
  debug: config.db.debug
});


var redis = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

if (!db || !redis) {
  process.exit(1);
}

redis.auth(config.redis.password, function(err) {
  if (err) {
    process.exit(1);
    console.error("redis auth failed");
  }
});

app.set('domain', process.argv[2] === 'pro' ? config.app.proDomain :
  config.app.devDomain);
app.set('port', process.argv[2] === 'pro' ? config.app.proPort :
  config.app.devPort);
app.set('env', process.argv[2]);
app.enable('trust proxy');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
sess = config.session(app.get('domain'));
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public/')));
//middlewares that attach db  connection to request object
app.use(attachDB(db));
//attach redis to the request object
app.use(attachRedis(redis));

// register router in app.
app.use(['/blog/admin(?!/login$)*'], requireLogin());
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
if (app.get('env') === 'dev') {
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
wsServer = new WsServer(server, db, redis);
wsServer.startBackgroundWork(config.ws.interval);

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
