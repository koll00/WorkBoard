#!/bin/bash
base=..
file=$1

svcNames=`awk 'BEBIN{FS="|"} {print $1}'` $base/CUPSvc.csv

for name in ${svcNames[@]};do
    iconv -f GB18030 -t UTF-8 $file | awk -v name=$name -f cutSvc.awk > $base/cupsSvcs/$name.xml
done