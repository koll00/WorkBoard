BEGIN{FS="="; check = 0}
/Logic Name/{if(substr($2, 2, length($2) - 2) == name && check == 0){print $0; check = 1; next}}
/\/Logic/ {if(check == 1){print $0; check = 0 ; next}}
{if(check == 1){print $0}}
{if(check == 0){next}}

END{}