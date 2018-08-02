
create database fomo3d;

use fomo3d;


### status

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

### lucky

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

### referer

CREATE TABLE referer (
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(80),
  referer INT,
  refId INT,
  PRIMARY KEY (id),
  UNIQUE (player)
);

