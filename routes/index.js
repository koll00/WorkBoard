var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs'),
    iconv = require('iconv-lite');

var FINGLOG = 'FIND LOG';
var SHOWLOG = 'SHOW LOG';
var KIDDING = 'KIDDING';
var DOWNLOAD = 'DOWNLOAD';
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'WELCOME' })
};

exports.kidding = function(req, res){
	console.log(KIDDING);
	
	var findLogQuery = url.parse(req.url).query;
	var param = querystring.parse(findLogQuery);
	
	res.render('kidding', { title: KIDDING, params: param  })
};

exports.noFunction = function(req, res){
    console.log(" NO!");
    res.render('kidding', { title: 'noFunction'});
};