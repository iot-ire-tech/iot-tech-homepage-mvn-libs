


aws ec2 
* create-security-group
* authorize-security-group-ingress Inbound Port 22 
* create-key-pair : *.pem
* run-instances : Start to login.
* describe-instances : Public IP describe (query)

ssh -i *.pem IP AMI_USER@IP
Ubuntu@IP or AWS@IP


download jdk, and tomcat,
scp them over
deploy  : scp *.war to webapps foler

