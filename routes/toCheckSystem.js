var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs'),
    iconv = require('iconv-lite')
    ;

var CHECKSYSTEM = 'CHECK SYSTEM';
var AUTOCHECK = 'AUTO CHECK';
var SUCCESS = 'SUCCESS';
var DOWNLOAD = 'DOWNLOAD';

exports.checkSystemInput = function(req, res, next){
    console.log(CHECKSYSTEM);
    var query = url.parse(req.url).query;
    var param = querystring.parse(query);
    if(query == null){
        next();
    }
    if(param.session == null || param.session != 1){
        next();
    }
    
    res.render('checkSystem', { title: CHECKSYSTEM});
    return;
};

exports.autoCheck = function(req, res, next){
	console.log(AUTOCHECK);
	
	var query = url.parse(req.url).query;
	var param = querystring.parse(query);
	
	var cmdStr='/tmp/nodejs/scripts/fixPart.sh';
	var cmdStr='help';
	
	var itemsBuffer = '';
	//var child = spawn(cmdStr, ['PL' + param.envID, systemID[param.systemID]]);
	var child = spawn(cmdStr);
	child.stdout.on('data', function(data){
		itemsBuffer += data.toString();
	});
	
	child.stderr.on('data', function(data){
		res.render('findLog', { title: AUTOCHECK});
	});
		
	child.on('close', function(data) {
			res.render('checkSystem', { title: AUTOCHECK});
	});
};

exports.checkSuccess = function(req, res){
    res.render('success', { title: SUCCESS});
};