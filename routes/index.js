var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs'),
    iconv = require('iconv-lite');

var FINGLOG = 'FIND LOG';
var SHOWLOG = 'SHOW LOG';
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.showLog = function(req, res){
	console.log(SHOWLOG);
	
	var showLogQuery = url.parse(req.url).query;
	var param = querystring.parse(showLogQuery);
	
	var cmdStr='/tmp/nodejs/scripts/cpftm.sh';
	
	var itemsBuffer = '';
	var child = process.spawn(cmdStr, [param.envID]);
	child.stdout.on('data', function(data){
		itemsBuffer += data.toString();
	});
	
	child.stderr.on('data', function(data){
		res.render('findLog', { title: FINGLOG, params: param });
	});
		
	child.on('close', function(data) {
		var itemString = itemsBuffer;
		if(itemString==''){
			res.render('findLog', { title: FINGLOG, params: param });
		}
		var items = eval('('+itemString+')');
		res.render('showLog', { title: SHOWLOG,  logs: items, params: param });
	});
};

exports.findLog = function(req, res){
	console.log(FINGLOG);
	
	var findLogQuery = url.parse(req.url).query;
	var param = querystring.parse(findLogQuery);
	
	res.render('findLog', { title: FINGLOG, params: param  })
};
	