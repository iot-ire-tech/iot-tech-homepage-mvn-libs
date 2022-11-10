#!/bin/bash

#  /etc/mongod.conf

# https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org

systemctl start mongod
systemctl status mongod





