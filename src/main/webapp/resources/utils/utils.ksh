#!/bin/bash


echo "\"insightRt\": [ "
for dow in {1..7}
do
	for hod in {0..23}
	do
		echo "{ \"dayOfWeek\": $dow, \"hourOfDay\":  $hod, \"counter\": 0 },"
	done
done
echo "]"



