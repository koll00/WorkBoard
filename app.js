
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , logRoutes= require('./routes/toLogs')
  , checkRoutes= require('./routes/toCheckSystem')
  ;

var app = express();

// Configuration

//app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.router);
  app.set('view options', { layout: false });
  app.set('port', 3000);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + "/downloadFile"));
//});

//app.configure('development', function(){
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});
//
//app.configure('production', function(){
//  app.use(express.errorHandler());
//});

// Routes

app.get('/', routes.index);

//查询日志
app.get('/showLog', logRoutes.showLog);
app.get('/findLog', logRoutes.findLog);
//下载文档
app.get('/downloadFiles', routes.downloadFiles);
//系统自动检测
app.get('/autoCheckSystem', checkRoutes.checkSystemInput);
app.get('/autoCheckSystem', routes.noFunction);
app.get('/checkSystem', checkRoutes.checkSuccess);

//默认不提供
app.get('/kidding', routes.noFunction);

/*app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});*/
http.createServer(app).listen(3000, function(){
	  console.log("Express server listening on port %d in  mode", app.get('port'));
});