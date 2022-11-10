#!/bin/sh -x

wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
apt update
apt install jenkins
systemctl status jenkins

# Need restart to get Password
 systemctl restart jenkins

cat /var/lib/jenkins/secrets/initialAdminPassword
# 488f391c43d449de96af7d9397123e07
http://localhost:8080/

# Restart Jenkins again after setup, then login
 systemctl restart jenkins