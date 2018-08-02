# games1

## game api server 启动

1. 测试网络

```
  NETWORK=3 node server/server.js
```

2. 正式环境

```
  NETWORK=1 node server/server.js
```

3. 邀请机制的实现

* 获取邀请号
  前端每次拿到链接后，解析url中的邀请号，填入当前data的 refId 字段中（没有填0）即可
* 生成邀请号
  任意页面初始化后，dapp库会去获取当前用户是否有邀请号，填入当前data的 selfId（没有填0）
  (请前端在info.vue界面提供一个 refUrl(refId) 函数，给定refId，生成推广链接)
  因为推广链接生成和解析是对应的，目前暂定是 http://www.fomo888.com?r=234 这种格式


4. 数据爬取

* 请在config/db.config.json里填上mysql连接信息, 参照template

* 启动数据爬取脚本

```
  NETWORK=3 node 
```