#!/usr/bin/ksh


DIR_DB=../../webapp/resources
ls -l  $DIR_DB

json-server -p 3000 -w $DIR_DB/iot-base-registration.json