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
  NETWORK=3 node server/scripts/event_logger.js   // 测试网络NETWORK 3, 正式网络 NETWORK 1，
```

------------------------------------

# 数据库相关

```
create database fomo3d;
use fomo3d;
```

### status 表

CREATE TABLE status (
  id INT NOT NULL AUTO_INCREMENT,
  category CHAR(20),
  event VARCHAR(255),
  block BIGINT,
  PRIMARY KEY (id),
  UNIQUE (category, event)
);

| property | type | extra |
|---| -----|----|
| id | INT | 自增主键 |
| category | CHAR(20) | 网络(ropsten 3, mainnet 1) |
| event | VARCHAR | 事件 |
| block | BIGINT | 当前block |

### lucky 表

CREATE TABLE lucky (
  id INT NOT NULL AUTO_INCREMENT,
  buyer VARCHAR(80),
  round INT,
  lucky INT,
  amount BIGINT,
  category CHAR(20),
  block BIGINT,
  tx VARCHAR(100),
  PRIMARY KEY (id),
  UNIQUE (round, category, lucky)
);

| property | type | extra |
|---| -----| --- |
| id | INT | 自增主键 |
| buyer | VARCHAR(80) | 中奖人地址 |
| round | INT | 轮次 (0开始) |
| lucky | INT | 幸运数（888，1776等） |
| amount | BIGINT | 中奖奖金 (eth * 10^18) |
| category | CHAR(20) | 网络 |
| block | BIGINT | block号 |
| tx | VARCHAR(100) | 交易hash |

### referer 表

CREATE TABLE referer (
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(80),
  referer INT,
  refId INT,
  PRIMARY KEY (id),
  UNIQUE (player)
);

| property | type | extra |
|---| -----| --- |
| id | INT | 自增主键 |
| player | VARCHAR(80) | 玩家地址 |
| referer | INT | 推荐人id |
| refId | INT(100) | 玩家自身id |

