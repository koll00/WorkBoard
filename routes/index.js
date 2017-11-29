var exec = require('child_process').exec,
    process = require('child_process'),
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs');
    //iconv = require('iconv-lite');

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
	
	var cmdStr='/tmp/nodejs/scripts/cpftm.sh ' + param.envID + ' ' + 'date';
	var cmdStr='dir';
//	exec(cmdStr, function(err, stdout, stderr){
//		if(err){
//			res.render('showLog', { title: SHOWLOG, params: param });
//		}else{
//			//stdout = '';
//			//var items = eval('('+stdout+')');
//			var file ='.\\routes\\test.json';
//			var items = JSON.parse(iconv.decode(fs.readFileSync(file),'GBK'));
//			//var items = eval('('+stdout+')');
//			res.render('showLog', { title: SHOWLOG,  logs: items, params: param });
//		}
//	})
	var child = process.spawn('dir');
	child.stdout.on('data', function(data){
		console.log('stdout is ' + data);
	});
	
	child.stderr.on('data', function(data){
		console.log('error is ' + data);
	});
	
/*	child.on('error', function(data){
		console.log('error is ' + data);
	});*/
	
	child.on('close', function(data) {
		console.log('Child exited with code');
	});
};

exports.findLog = function(req, res){
	console.log(FINGLOG);
	
	var findLogQuery = url.parse(req.url).query;
	var param = querystring.parse(findLogQuery);
	
	res.render('findLog', { title: FINGLOG, params: param  })
};
	