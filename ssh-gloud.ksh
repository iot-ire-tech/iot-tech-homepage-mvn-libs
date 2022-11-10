#!/bin/sh

gcloud compute scp 	iot-base-1.0-SNAPSHOT.war 	ae@iot-base:workspace 			--zone europe-west2-a
gcloud compute ssh 					ae@iot-base --force-key-file-overwrite 	--zone europe-west2-a
INSTANCE=iot-base

gcloud compute scp target/*.war $INSTANCE:~/green.war
gcloud compute ssh $INSTANCE --command "sudo service tomcat stop"
gcloud compute ssh $INSTANCE --command "sudo mv ~/green.war /opt/tomcat/webapps"
gcloud compute ssh $INSTANCE --command "sudo service tomcat start"
gcloud compute ssh $INSTANCE --command "sudo cat /opt/tomcat/logs/catalina.out"


exit
TARGET=$1
ssh -o UserKnownHostsFile=/dev/null  -o CheckHostIP=no  -o StrictHostKeyChecking=no  -i /home/ennisa/.ssh/google_compute_engine -A -p 22 ae@$TARGET
