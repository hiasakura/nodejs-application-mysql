# nodejs-application-mysql
Simple node.js application developer code to connect with Mysql on AWS


・EC2で以下にモジュールを配置
/home/ec2-user/node/timecard
[ec2-user@ip-XXXXXXx timecard]$ ls -ltr
total 8
-rw-rw-r-- 1 ec2-user ec2-user  379 Feb 25  2019 auth.js
-rw-rw-r-- 1 ec2-user ec2-user 2718 Mar  4  2019 server.js
drwxrwxr-x 2 ec2-user ec2-user  156 May 17 01:56 views

・アップロード用のtmpファイル置き場を作成
mkdir /tmp/samplefup/
chmod 777 /tmp/samplefup/

・js起動
forever start server.js
