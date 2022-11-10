#!/bin/ksh -x

INSTANCE=iot-base-green
RESOURCE_DIR=src/main/webapp/resources


# Strutcut
/home/ennisa/workspace/tools/build/apache-maven-3.6.0/bin/mvn -Piot-base-gcloud clean install

# Gloud
INSTANCE=iot-base
ZONE=europe-west2-a


 
gcloud compute ssh ae@$INSTANCE --command "sudo rm -rf ~/green.war" --zone europe-west2-a
gcloud compute scp target/*.war ae@$INSTANCE:~/green.war --zone europe-west2-a
gcloud compute ssh ae@$INSTANCE --command "sudo service tomcat stop" --zone europe-west2-a
gcloud compute ssh ae@$INSTANCE --command "sudo mv ~/green.war /opt/tomcat/webapps" --zone europe-west2-a
gcloud compute ssh ae@$INSTANCE --command "sudo service tomcat start" --zone europe-west2-a
gcloud compute ssh ae@$INSTANCE --command "sudo cat /opt/tomcat/logs/catalina.out" --zone europe-west2-a

# Rebuild Local!!!
/home/ennisa/workspace/tools/build/apache-maven-3.6.0/bin/mvn -Piot-base-local clean install