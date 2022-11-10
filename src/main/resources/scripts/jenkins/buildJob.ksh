#!/bin/ksh -x


JOB=Pr_FreeStyle
JOB=bookingSystem/google-homepage-deploy
RESOURCE_DIR=/media/ae/ssd-workspace/workspace/sw/projects/bookings/mvn/iot-tech-homepage-mvn/src/main/resources/scripts
java -jar ${RESOURCE_DIR}/jenkins-cli.jar -s http://localhost:2999/ build $JOB -w
