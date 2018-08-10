#!/bin/bash

# 先更新src/lib/deployed.js 里的f3dM 和 f3dm_deploy
# 另外请git pull下整个项目，前端和server端放在一个目录下，因为有参数共用


user=
password=
NETWORK=

echo "build前端"
npm run build  

echo "停掉后端"
ps aux | grep "server/server.js" | awk '{print $2}' | xargs kill
ps aux | grep "server/scripts/event_logger.js" | awk '{print $2}' | xargs kill

echo "清除数据库"
mysql -u$user -p$password -Dfomo3d -e "show tables;"
mysql -u$user -p$password -Dfomo3d -e "delete from buy;"
mysql -u$user -p$password -Dfomo3d -e "delete from g_stat;"
mysql -u$user -p$password -Dfomo3d -e "delete from lucky;"
mysql -u$user -p$password -Dfomo3d -e "delete from withdrawal;"
mysql -u$user -p$password -Dfomo3d -e "delete from referer;"
mysql -u$user -p$password -Dfomo3d -e "delete from status;"

export NETWORK=$NETWORK

echo "重启后端"

nohup node server/server.js 1>>server.log 2>&1 &
nohup node server/scripts/event_logger.js 1>>event.log 2>&1 &



