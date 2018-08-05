delete from buy;
delete from g_stat;
delete from lucky;
delete from withdrawal;
delete from referer;
delete from status;

/**
 * update group leader buy and withdrawal
 */
DELIMITER //
CREATE DEFINER=`jerry` PROCEDURE `updateGroup`(IN id INT, IN players INT, IN amount DECIMAL(30, 0), IN withdrawal DECIMAL(30, 0), IN category CHAR(20))
BEGIN
DECLARE player_addr VARCHAR(80);
SET player_addr := (select player from referer where refId=id);
if player_addr is not null 
then
  INSERT INTO g_stat (player, refId, refPlayers, refBuy, refWithdrawal, category) values (player_addr, id, players, amount, withdrawal, category) ON DUPLICATE KEY UPDATE refBuy = refBuy + amount, refWithdrawal = refWithdrawal + withdrawal, refPlayers = refPlayers + players;
end if;
END//
DELIMITER ;

DELIMITER //
CREATE DEFINER=`jerry` PROCEDURE `findParent`(IN addr VARCHAR(80), IN players INT, IN amount DECIMAL(30, 0), IN withdrawal DECIMAL(30, 0), IN category CHAR(20))
BEGIN
DECLARE b INT;
DECLARE t_pid CURSOR FOR select referer from referer  where player=addr;
set @done=0;
OPEN t_pid;
FETCH t_pid INTO b;
if b <=0 or b is null
 then set @done =1;
else
  CALL updateGroup(b, players, amount, withdrawal, category);
end if;

WHILE (@done = 0)
DO
 CALL findParent(b);
END WHILE;
END//
DELIMITER ;