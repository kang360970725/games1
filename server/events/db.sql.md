
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

| property | type |
|---| -----|
| id | INT |
| category | CHAR(20) |
| event | VARCHAR |
| block | BIGINT |

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
  UNIQUE (round, category, lucky)
);

| property | type |
|---| -----|
| id | INT |
| buyer | VARCHAR(80) |
| round | INT |
| lucky | INT |
| amount | BIGINT |
| category | CHAR(20) |
| block | BIGINT |
| tx | VARCHAR(100) |

### referer

CREATE TABLE referer (
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(80),
  referer INT,
  refId INT,
  PRIMARY KEY (id),
  UNIQUE (player)
);

