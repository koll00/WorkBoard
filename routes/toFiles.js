var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs'),
    iconv = require('iconv-lite')
    ;

var FINGLOG = 'FIND LOG';
var SHOWLOG = 'SHOW LOG';
var KIDDING = 'KIDDING';
var DOWNLOAD = 'DOWNLOAD';

exports.downloadFiles = function(req, res,next){
	console.log(DOWNLOAD);
	
	var urlQuery = url.parse(req.url).query;
	var param = querystring.parse(urlQuery);
	console.log(param.file);
//	res.sendfile('./1.pdf','1.pdf');
	res.download(__dirname+'../1.pdf','1.pdf');
	//res.download('..//public\\1.pdf');
//	res.download('..//public\\downloadFile\\1.pdf');
	//res.sendfile('中国银联离线仿真使用指引.pdf', { root:__dirname+'../donwloadFile' });
	//res.render('downloadFiles', { title: DOWNLOAD})
};
