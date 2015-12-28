//var webRouter = require('./web_router');
var apiRouterV1 = require('./router/api_router_v1');
var webRouter = require('./router/web_router');
var express = require('express');
var cors = require('cors');
var app = express();
var config = require('./config');
var logger = require('./common/logger');
var path = require('path');
var bodyParser = require('body-parser');
// routes
var staticDir = path.join(__dirname, 'dist');
app.enable('trust proxy');

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/dist', express.static(staticDir));
app.use('/api/v1', cors(), apiRouterV1);
app.use('/', webRouter);



/*
// error handler
if (config.debug) {
  //app.use(errorhandler());
  Console.log('error---app.js');
} else {
  app.use(function (err, req, res, next) {
    console.error('server 500 error:', err);
    return res.status(500).send('500 status');
  });
}
*/
app.listen(config.port, function () {
 
  logger.log('Fun Quiz listening on port', config.port);
  logger.log('');
});


module.exports = app;