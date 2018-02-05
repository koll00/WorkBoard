#!/bin/bash

get_date()
{
plat_date=`sqlplus -S $userPwd@$sshHost << EOF 
set heading off feedback off pagesize 0 verify off echo off
select plat_date from t_plat_para;
EOF`
acct_date=`sqlplus -S $userPwd@$sshHost << EOF 
set heading off feedback off pagesize 0 verify off echo off
select acct_date from t_plat_para;
EOF`
}

get_vtspace()
{
table_name=$1
acct_date=`sqlplus -S $userPwd@$sshHost << EOF 
set heading off feedback off pagesize 0 verify off echo off
select tablespace_name from user_tab_partitions where table_name='$table_name' and rownum=1;
EOF`
}

fix_part()
{
table_name=$1
vFlag=values
if [ "x$table_name" = "xT_PY_AR_ACMD_HIST_TBL" ];then
	vtmpDt=$acct_date
else
	vtmpDate=$plat_date
fi

vTab=`echo $table_name| cut -c 1-21`

if [ "x$vtbspace" = "x" ];then
	result=`sqlplus -S $userPwd@$sshHost << EOF 
	set heading off feedback off pagesize 0 verify off echo off
        alter table $table_name add partition ${vTab}_$vtmpDt $vFlag ('$vtmpDt') pctfree 10 initrans 1 maxtrans 255;
EOF`
else
	result=`sqlplus -S $userPwd@$sshHost << EOF 
	set heading off feedback off pagesize 0 verify off echo off
        alter table $table_name add partition ${vTab}_$vtmpDt $vFlag ('$vtmpDt')tablespace $vtbspace pctfree 10 initrans 1 maxtrans 255;
EOF`
fi
}


fix_all()
{
get_vtbspace "T_CES_SETTLE_JRNL"
fix_part "T_CES_SETTLE_JRNL"
echo $result

get_vtbspace "T_PY_AR_ACMD_HIST_TBL"
fix_part "T_PY_AR_ACMD_HIST_TBL"
echo $result

get_vtbspace "T_TRANSF_OUT_TRAN_JRNL"
fix_part "T_TRANSF_OUT_TRAN_JRNL"
echo $result

get_vtbspace "T_SETTLE_CUPSCR_JRNL"
fix_part "T_SETTLE_CUPSCR_JRNL"
echo $result

get_vtbspace "T_SETTLE_YLIFE_JRNL"
fix_part "T_SETTLE_YLIFE_JRNL"
echo $result

get_vtbspace "T_SAVE_TRAN_JRNL"
fix_part "T_SAVE_TRAN_JRNL"
echo $result
}


$main

NODEJS=..
sshList=$NODEJS/etc/sqlList

sshMachine=$1
system=$2
typeset -u table_name
table_name=$3

. ./getHost.sh

sshHost=$(getHost $sshList $sshMachine $system)

userPwd=$(getSqlUserPwd $sshList $sshMachine $system)


get_date

fix_all
