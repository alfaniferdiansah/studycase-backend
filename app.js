var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
var indexRouter = require('./routes/index');
const cors = require('cors');
var app = express();
const { NOT_FOUND_PATH } = require('./constant/errorCode');
const { NOT_FOUND, ERROR_SERVER } = require('./constant/errorHttp');
const { PATH_NOT_FOUND } = require('./constant/errorMessage');
const HttpError = require('./interface/httpError');
const ResponseMiddleware = require('./middleware/responseMiddleware');

var http = require('http');
const db = require('./database/index')
var debug = require('debug')('studycase-backend-ferdy:server');

var allowedOrigins = [
  "http://localhost:3000",
  "https://mern-ecommerce-tawny.vercel.app"
]

app.use(cors({

  origin: function(origin, callback){
    
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./middleware/passport-local-strategy');


require('./middleware/passport-jwt-strategy');
app.use(indexRouter);

app.use(ResponseMiddleware.response)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new HttpError(PATH_NOT_FOUND, NOT_FOUND, NOT_FOUND_PATH);
  throw error;
})

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3021');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

db.on('open', function(){
  server.listen(port, () => {
    console.log(`server running in port ${port}`);
  })
  server.on('error', onError);
  server.on('listening', onListening);
  console.log('connection onto database success');
})

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

app.use((error, req, res, next) => {
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.status || ERROR_SERVER).json({ message : error.message, code: error.code });
})


module.exports = app;
