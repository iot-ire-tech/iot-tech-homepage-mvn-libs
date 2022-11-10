#!/bin/sh 

cat text-colors.md | awk  '
{
	split($0,colorArr,"{")
	split($0,commaArr,",")
	print "html += \"<option value=" commaArr[1] ">" commaArr[1] "</option>\""
#klkj
}
'
