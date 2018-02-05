#!/bin/bash

#main
NODEJS=..
sshList=$NODEJS/etc/mList

sshMachine=$1
system=$2
efn=$3
#cdo esb _ccbs_http comm_http
ca=$4

. ./getHost.sh

sshHost=$(getHost $sshList $sshMachine $system)

files=`ssh $sshHost "grep -Rl $efn /home/ap/cdp/log/*/*fmt  | grep $ca"`

for file in ${files[@]};do
	lines=`ssh $sshHost "grep -n $efn $file | awk -F: '{print $1}'"`
	for line in ${files[@]};do
		fmtFile=`ssh $sshHost "cat $file"`
		SAVEIF=$IFS
		IFS="\n"
		result=`echo $fmtFile | awk -v flag=0 -v efn=$efn -v row=$line '{if(NR>=row){if(flag == 0 && $0 !~ efn){next}; if($0 ~ efn){flag = 1}; if(flag == 1 && length($0) == 0){exit}; print NR,$0 }else{next}}'`
		echo $result
		IFS=$SAVEIF
	done
done
