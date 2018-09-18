var exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    url = require('url'),
    querystring = require('querystring'),
    fs= require('fs'),
    iconv = require('iconv-lite');

CUPSCRLOG='银联贷记'
/*
 * 
 */

exports.cupsCrsubForm= function(req, res){
  res.render('cupsCrSub', { title: CUPSCRLOG })
};

exports.cupsCrOk= function(req, res){
  var subQuery= url.parse(req.url).query;
  var param = querystring.parse(subQuery);

  var cmdStr='/home/ap/hlrhx/user/ssj/WorkBoard/public/scripts/cupscr.sh';
  var itemsBuffer = '';
  var child = spawn(cmdStr,[param.envID, param.systemID, param.sys_trace_id]);
  console.log(cmdStr + param.envID + param.systemID);
  child.stdout.on('data', function(data){
      itemsBuffer += data.toString();
  });

  child.stderr.on('data', function(data){
      res.render('cupsCrSub', { title: CUPSCRLOG, params: param });
  });

  child.on('close', function(data) {
     res.render('success', { title: '银联贷记'});
  });
};

