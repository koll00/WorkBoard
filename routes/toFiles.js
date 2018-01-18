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
	var cmdStr='help';
	
	var itemsBuffer = '';
	var child = spawn(cmdStr);
	child.stdout.on('data', function(data){
		itemsBuffer += data.toString();
	});
	
	child.stderr.on('data', function(data){
		res.render('findLog', { title: FINGLOG, params: param });
	});
		
	child.on('close', function(data) {
		var itemString = itemsBuffer;
		if(itemString.length == 0){
			res.render('findLog', { title: FINGLOG, params: param });
		}else{
			var file ='.\\routes\\test.json';
			var items = JSON.parse(iconv.decode(fs.readFileSync(file),'GBK'));
			//var items = eval('('+itemString+')');
			res.render('showLog', { title: SHOWLOG,  logs: items, params: param });
		}
	});
};

exports.findLog = function(req, res){
	console.log(FINGLOG);
	
	var findLogQuery = url.parse(req.url).query;
	var param = querystring.parse(findLogQuery);
	
	res.render('findLog', { title: FINGLOG, params: param  })
};

exports.kidding = function(req, res){
	console.log(KIDDING);
	
	var findLogQuery = url.parse(req.url).query;
	var param = querystring.parse(findLogQuery);
	
	res.render('kidding', { title: KIDDING, params: param  })
};

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
