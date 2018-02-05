#!/bin/bash

file=$1

iconv -f GB18030 -t UTF-8 $file | awk 'BEGIN{FS='='} /Logic Name/{printf "%s|", subStr($2, 2, length($2) - 2)}; /Desc/ && !/NodeClass/ && !/Proc Type/{printf "%s|", subStr($2, 2, length($2) - 2)}; /FlowModel/{gsub(/[[:blank:]]/, "", $0);printf "%s\n", subStr($2, 2, length($2) - 2)}'