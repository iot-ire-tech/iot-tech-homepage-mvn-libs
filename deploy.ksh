#!/bin/ksh -x

#gcloud config configurations list
#NAME     IS_ACTIVE  ACCOUNT                      PROJECT           COMPUTE_DEFAULT_ZONE  COMPUTE_DEFAULT_REGION
#default  True       tonyennis@mybusinesspal.com  speech2text-1218  europe-west4-b        europe-west4

PROJECT_ID=sportsco-217112
gcloud components update
gcloud auth list
# gcloud config set account tonygennis@gmail.com
#gcloud auth login tonygennis@gmail.com

gcloud config set project $PROJECT_ID

# gcloud beta compute ssh --zone "europe-west2-a" "ae@iot-base"  --project "sportsco-217112"

cd /home/ennisa/workspace/projects/iot-tech-homepage-mvn; 
JAVA_HOME=/usr/lib/jvm/java-8-oracle 
M2_HOME=/home/ennisa/workspace/tools/build/apache-maven-3.6.0 

# Make sure your Gloud Profile 
# 1. env file is up to date
# 1. env-gloud file is up to date
# 1. pom profiles 


wget  http://www.google.com/ping?sitemap=https://mybusinesspal.com/sitemap.xml -o googleping.txt


# Build Remote
/home/ennisa/workspace/tools/build/apache-maven-3.6.0/bin/mvn -Piot-base-gcloud clean install

# Gloud
INSTANCE=iot-base
ZONE=europe-west2-a
gcloud compute scp target/*.war ae@$INSTANCE:~/green.war --zone $ZONE
#gcloud compute ssh ae@iot-base --zone europe-west2-a
gcloud compute ssh ae@$INSTANCE --command "sudo service tomcat stop" --zone $ZONE
gcloud compute ssh ae@$INSTANCE --command "sudo mv ~/green.war /opt/tomcat/webapps/ROOT.war" --zone $ZONE
gcloud compute ssh ae@$INSTANCE --command "sudo service tomcat start" --zone $ZONE
gcloud compute ssh ae@$INSTANCE --command "sudo cat /opt/tomcat/logs/catalina.out" --zone $ZONE

exit
# Rebuild Local!!!
/home/ennisa/workspace/tools/build/apache-maven-3.6.0/bin/mvn -Piot-base-local clean install

exit
/home/ennisa/workspace/tools/build/apache-maven-3.6.0/bin/mvn \
-Dnetbeans.deploy=true \
-Dnetbeans.deploy.clientUrlPart=/services/business/entity/entityManagement.jsp \
-Piot-base-local \
package
