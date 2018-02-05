#!/bin/bash

getHost()
{
    hostFile = $1
    keyValue = $2
    machine = $3
    awk -v value=$keyValue -v machine=$machine '{if($2 == toupper(value) && $4 == toupper(machine)){print $3}}' $hostFile
}

getSqlHost()
{
    hostFile = $1
    keyValue = $2
    machine = $3
    awk -v value=$keyValue -v machine=$machine '{if($2 == toupper(value) && $4 == toupper(machine)){print $3}}' $hostFile
}

getSqlUserPwd()
{
    hostFile = $1
    keyValue = $2
    machine = $3
    awk -v value=$keyValue -v machine=$machine '{if($2 == toupper(value) && $4 == toupper(machine)){print $3}}' $hostFile
}