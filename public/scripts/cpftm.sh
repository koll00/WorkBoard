#!/bin/bash

NODEJS=..
sshList=$NODEJS/etc/mList
sshMachine=$1
system=$2
fileName=ftm_20`date +"%y_%m%d"`.0001.log

. ./getHost.sh

sshHost=$(getHost $sshList $sshMachine $system)

count=500

result=`ssh $sshHost "grep -v CR0 /home/ap/cdp/log/$fineName | tail -$count" |iconv -f GB18030 -t UTF-8 | awk -F"[<>]" 'BEGIN{print "["} {gsub(/[[:blank:]]/,"" $22);if($6 ~ /OCT/){$46=""};printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%s\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2,$6,$12,$14,$20,$22,substr($26, length($26)-5, length($26)),$46,$48,$36}END{print "]"}'`

result="{\"data\":$result}"
echo $result
exit
