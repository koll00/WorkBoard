#!/bin/bash
NODEJS=/home/ap/hlrhx/user/ssj/WorkBoard
sqlList=$NODEJS/public/etc/sqlList

. $NODEJS/public/scripts/getHost.sh

sshMachine=$1
system=$2
SYS_EVT_TRACE_ID=$3

sqlHost=$(getSqlHost $sqlList $sshMachine $system)

crNoTrace()
{
sqlHost=$1
trace_id=$2
result=`sqlplus -S $sqlHost<< EOF
set heading off feedback off pagesize 0 verify off echo off
update T_SETTLE_CUPSCR_JRNL set SYSTRACE='111111' where SYS_EVT_TRACE_ID='$trace_id';
commit;
EOF
`
}

crNoTrace $sqlHost $SYS_EVT_TRACE_ID 2>/dev/null

exit
