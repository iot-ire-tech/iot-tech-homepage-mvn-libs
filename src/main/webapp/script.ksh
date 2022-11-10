
# SSL Dependency
sudo apt-get install -y libapr1-dev libssl-dev
#########################
# Persmissions
#########################

cd $DIR_TC 
chgrp -R tomcat  $DIR_TC
chmod -R g+r conf
chmod g+x conf
chown -R tomcat webapps/ work/ temp/ logs/




# Service It

cat <<! > /etc/systemd/system/tomcat.service
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=${JAVA_HOME}
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/opt/tomcat
Environment=CATALINA_BASE=/opt/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

User=tomcat
Group=tomcat
UMask=0007
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
!

systemctl daemon-reload
systemctl start tomcat
systemctl enable tomcat
service tomcat start

# Add user to tomcat-users
# http://tldp.org/LDP/abs/html/here-docs.html
#manager-gui and admin-gui
#/opt/tomcat/conf/tomcat-users.xml
#    <user username="admin" password="password" roles="manager-gui,admin-gui"/>


#
# need to do as tomcat doesnt have permssion to run 80 socket
# Look at service file config update to sudo root? or add tomcat to sudo goroo
# /etc/systemd/system/tomcat.service
#
# Forward 80 to 8080 
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8443
# Forward 443 to ??? 

exit
<SSLHostConfig>
<Certificate certificateKeyFile="conf/privkey.pem" certificateFile="conf/cert.pem" certificateChainFile="conf/chain.pem" type="RSA" />
</SSLHostConfig>

