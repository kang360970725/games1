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
  category CHAR(20) NOT NULL,
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
  amount DECIMAL(30, 0),
  category CHAR(20) NOT NULL,
  block BIGINT,
  tx VARCHAR(100),
  PRIMARY KEY (id),
  UNIQUE (round, category, lucky),
  UNIQUE (tx)
);

| property | type | extra |
|---| -----| --- |
| id | INT | 自增主键 |
| buyer | VARCHAR(80) | 中奖人地址 |
| round | INT | 轮次 (0开始) |
| lucky | DECIMAL(30, 0) | 幸运数（888，1776等） |
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
  category CHAR(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (player)
);

| property | type | extra |
|---| -----| --- |
| id | INT | 自增主键 |
| player | VARCHAR(80) | 玩家地址 |
| category | CHAR(20) | 网络 |
| referer | INT | 推荐人id |
| refId | INT(100) | 玩家自身id |

### buy 表 入金记录

CREATE TABLE buy (
  id INT NOT NULL AUTO_INCREMENT,
  buyer VARCHAR(80),
  bought DECIMAL(30, 0),
  cost DECIMAL(30, 0),
  round INT,
  block BIGINT,
  category CHAR(20) NOT NULL,
  tx VARCHAR(100),
  PRIMARY KEY (id),
  UNIQUE (tx)
);

| property | type | extra |
|---| -----| --- |
| id | INT | 自增主键 |
| buyer | VARCHAR(80) | 买家地址 |
| bought | DECIMAL(30, 0) | 购买key数量 |
| cost | DECIMAL(30, 0) | 花费eth数量 |
| category | CHAR(20) | 网络 |
| round | INT | 轮次 |
| block | BIGINT | block号 |
| tx | VARCHAR(100) | 交易hash |

### withdrawal 提现表

CREATE TABLE withdrawal (
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(80),
  amount DECIMAL(30, 0),
  fee DECIMAL(30, 0),
  block BIGINT,
  category CHAR(20) NOT NULL,
  tx VARCHAR(100),
  PRIMARY KEY (id),
  UNIQUE (tx)
);

| property | type | extra |
|----------|------|-------|
|  id      | INT | 自增主键 |
|  player   | VARCHAR(80) | 玩家地址 |
| amount | DECIMAL(30, 0) | 提现数量 |
| fee    | DECIMAL(30, 0) | 手续费 |
| block  | BIGINT | block号 |
| tx    | VARCHAR(100) | 交易hash |
| category  | CHAR(20) | 网络 |

### group 团长表

CREATE TABLE g_stat (
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(80),
  refId INT,
  refPlayers INT,
  refBuy  DECIMAL(30, 0),
  refWithdrawal DECIMAL(30, 0),
  category CHAR(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (player),
  UNIQUE (refId)
);

| property | type | extra |
|----------|------|-------|
|  id      | INT | 自增主键 |
|  player   | VARCHAR(80) | 玩家地址 |
| refId | INT | 玩家自身推荐编号 |
| refPlayers | INT | 推荐人总数 |
| refBuy | VARCHAR(80) | 推荐入金总数 |
| refWithdrawal | VARCHAR(80) | 推荐提现总数 |
| category  | CHAR(20) | 网络 |


## 两个存储过程
```
DELIMITER //
CREATE PROCEDURE `updateGroup`(IN id INT, IN players INT, IN amount DECIMAL(30, 0), IN withdrawal DECIMAL(30, 0), IN category CHAR(20))
BEGIN
DECLARE player_addr VARCHAR(80);
DECLARE player_ref INT;
SET max_sp_recursion_depth=255;
SET @done = 0;

SET player_addr := (select player from referer where refId=id);
if player_addr is null 
then
  set @done = 1;
else
  INSERT INTO g_stat (player, refId, refPlayers, refBuy, refWithdrawal, category) values (player_addr, id, players, amount, withdrawal, category) ON DUPLICATE KEY UPDATE refBuy = refBuy + amount, refWithdrawal = refWithdrawal + withdrawal, refPlayers = refPlayers + players;
end if;

WHILE(@done = 0)
DO
  SET player_ref := (select referer from referer where refId=id);
  CALL updateGroup(player_ref, players, amount, withdrawal, category);
END WHILE;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `findParent`(IN addr VARCHAR(80), IN players INT, IN amount DECIMAL(30, 0), IN withdrawal DECIMAL(30, 0), IN category CHAR(20))
BEGIN
DECLARE b INT;
DECLARE t_pid CURSOR FOR select referer from referer  where player=addr;
OPEN t_pid;
FETCH t_pid INTO b;
if b is not null AND b > 0
then 
 CALL updateGroup(b, players, amount, withdrawal, category);
end if;
END//
DELIMITER ;
```


## server端API

1. 幸运奖数据

    GET /fp3d/luckies

    http://localhost:4357/fp3d/luckies

  
    ```
    {
      "code": 0,
      "data": [
          {
            "id": 11,
            "buyer": "0x3bB110A6e5Df7873775Cde1A2D08805c2539Ee69",  //中奖玩家
            "round": 1,                                   //中奖轮次，0开始
            "lucky": 10,                                  //中奖号
            "amount": 3802635658929291,                   //中奖数量
            "category": "3",
            "block": 3774751,                             //中奖block
            "tx": "0x9e4c654c78633b829665f7ec3ee41253fe0104415b29c1a426f6a148da1f308f"                                        //中奖交易
          },  
          {
            "id": 12,
            "buyer": "0x3bB110A6e5Df7873775Cde1A2D08805c2539Ee69",
            "round": 1,
            "lucky": 20,
            "amount": 46467815255687900,
            "category": "3",
            "block": 3774813,
            "tx": "0x03abd0de95da1100867104a06c4e63ab023ecd971adde6b2fef00b879a6d38e6"
          }
      ]
    }
    ```

2. 团长数据

    GET /fp3d/g_stat?player={player address}
    
    http://localhost:4357/fp3d/g_stat?player=0x92694d5c7e2655e3f358130ebd0e7Db3FbD3e455


    返回结果:

    
    ```
    {
      "code": 0,
      "data": {
          "id": 21,
          "player": "0x92694d5c7e2655e3f358130ebd0e7Db3FbD3e455",
          "refId": 1,
          "refPlayers": 1,          // 共推荐玩家
          "refBuy": 0,              // 推荐玩家入金
          "refWithdrawal": 0,       // 推荐玩家出金
          "category": "3"
      }
    }
    ```

3. 随机玩家列表

    GET /fp3d/random_players

    http://localhost:4357/fp3d/random_players

    返回结果:

    ```
    {
      "code": 0,
      "data": [
        "0x92694d5c7e2655e3f358130ebd0e7Db3FbD3e455",
        "0x29CF8F3Bf87E03c6ddF2480B02a0e4140Ad67011",
        "0x3bB110A6e5Df7873775Cde1A2D08805c2539Ee69"
        ]
    }
    ```
