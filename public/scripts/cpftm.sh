#!/bin/bash

NODEJS=$HOME/user/ssj/WorkBoard/public
sshList=$NODEJS/etc/mList
sshMachine=$1
system=$2
fileName=ftm_20`date +"%y_%m%d"`.0001.log

. $NODEJS/sripts/getHost.sh

sshHost=$(getHost $sshList $sshMachine $system)

result="[]"
count=100
if [ $system == "CES" ];then
	result=`ssh $sshHost "grep -v CR0 /home/ap/cdp/log/$fileName | tail -$count 2>/dev/null" |iconv -f GB18030 -t UTF-8 | awk -F"[<>]" 'BEGIN{print "["} {gsub(/[[:blank:]]/,"" $22);if($6 ~ /OCT/){$46=""};printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%.2f\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2,$6, $12 ,$14,$20,$22,substr($26, length($26)-5, length($26)),$46,$48,$36}END{print "]"}'`
	#result=`ssh $sshHost "grep -v CR0 /home/ap/cdp/log/$fileName | grep -v NES |tail -$count" |iconv -f GB18030 -t UTF-8 | awk -F"[<>]" 'BEGIN{print "["} {gsub(/[[:blank:]]/,"" $22);if($6 ~ /OCT/){$46=""};printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%s\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2,$6, $12 ,$14,$20,$22,substr($26, length($26)-5, length($26)),$46,$48,$36}END{print "]"}'`
fi

if [ $system == "NCUPS" ];then
	result=`ssh $sshHost "grep -v 'cos<000>' /home/ap/cups/log/$fileName| tail -$count 2>/dev/null" | awk -F"[<>]" '{if(substr($4, 0, 2) !="00")print}' |awk -F"[<>]" 'BEGIN{print "["} {printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%.2f\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2, $10, $44, $48, $34, $36, substr($54,12,6),$28, $6, $4} END{print "]"}'`
fi

if [ $system == "CUPSHK" ];then
	result=`ssh $sshHost "grep -v 'cos<000>' /home/ap/cupshk/log/$fileName|tail -$count  2>/dev/null" | awk -F"[<>]" '{if(substr($4, 0, 2) !="00" && $10 !="")print}' |awk -F"[<>]" 'BEGIN{print "["} {printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%s\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2, $10, $44, $48, $34, $36, substr($54,12,6),$28, $6, $4} END{print "]"}'`
fi

if [ $system == "TY" ];then
	result=`ssh $sshHost "grep -v 'cos<000>' /home/ap/cups/log/$fileName |tail -$count 2>/dev/null" | awk -F"[<>]" '{if(substr($4, 0, 2) !="00" && $10 !="")print}' |awk -F"[<>]" 'BEGIN{print "["} {printf "{\"time\":\"%s\",\"tranId\":\"%s\",\"cardNo\":\"%s\",\"amt\":\"%s\",\"respCode\":\"%14s\",\"respDesc\":\"%60s\",\"cupsF11\":\"%6s\",\"callRespCode\":\"%35s\",\"evt\":\"%s\",\"cost\":\"%s\"},", $2, $10, $44, $48, $34, $36, substr($54,12,6),$28, $6, $4} END{print "]"}'`
fi

result="{\"data\":"$result"}"
echo $result
exit
