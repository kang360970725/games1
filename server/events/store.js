//return the start block of a event of category

const mysql      = require('mysql');
const dbConf = require("../../config/db.config.json")

const connection = mysql.createPool(dbConf);

const _startBlocks = require('../../src/lib/deployed').fp3dM_deploy

function startBlock(event, category) {
  return _startBlocks[category]
}

function curBlock(event, category) {
  const sql = `SELECT block FROM status WHERE category = "${category}" AND event = "${event}" `
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query start block of ${event} ${category}`, err)
        j(err)
      } else {
        if (results.length === 0) {
          r(0)
        } else if(results.length !== 1) {
          throw `${event} ${category} has more than one record`
        } else {
          r(results[0].block + 1)
        }
      }
    })
  })
}

/**
 *
 * @param {*} eve { buyer, round, lucky, amount }
 * @param {*} block
 * @param {*} txHash
 * @param {*} category
 */
function storeLuckyEvent(eve, block, txHash, category) {
  const sql = `INSERT INTO lucky (buyer, round, lucky, amount, category, block, tx) VALUES("${eve.buyer}", ${eve.round}, ${eve.lucky}, ${eve.amount}, ${category}, ${block}, "${txHash}")`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert lucky event ${category}`, err)
        j(err)
      } else {
        if (results.length === 0) {
          r(0)
        } else {
          r(0)
        }
      }
    })
  })
}

/**
 *
 * @param {*} eve { referral, pUser }
 * @param {*} block
 * @param {*} txHash
 * @param {*} category
 */
function storeReferEvent(eve, block, txHash, category) {
  const sql = `INSERT INTO referer (player, referer, category) VALUES("${eve.referral}", "${eve.pUser}", "${category}")`
  console.log(sql)
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert refer event ${NETWORK}`, err)
        j(err)
      } else {
        if (results.length === 0) {
          r(0)
        } else {
          r(0)
        }
      }
    })
  })
}

function updateEventBlock(event, category, block) {
  const sql = `INSERT INTO status (category, event, block) VALUES("${category}", "${event}", ${block}) ON DUPLICATE KEY UPDATE block=${block}`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query start block of ${event} ${category}`, err)
        j(err)
      } else {
        if (results.length === 0) {
          r(0)
        } else {
          r(0)
        }
      }
    })
  })
}

/**
 * 
 * @param {*} eve { buyer, keys, cost, round }
 * @param {*} block 
 * @param {*} tx 
 * @param {*} NETWORK 
 */
function storeBuyEvent(eve, block, tx, NETWORK) {
  const sql = `INSERT INTO buy (buyer, bought, cost, round, block, tx, category) VALUES("${eve.buyer}", ${eve.keys}, ${eve.cost}, ${eve.round}, ${block}, "${tx}", "${NETWORK}")`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert buy event ${NETWORK}`, err)
        j(err)
      } else {
        const procedure = `CALL findParent("${eve.buyer}", 0, ${eve.cost}, 0)`
        connection.query(procedure, (err, reulsts, fields) => {
          if (results.length === 0) {
            r(0)
          } else {
            r(0)
          }
        })        
      }
    })
  })
} 

/**
 * 
 * @param {*} eve { player, amount, fee }
 * @param {*} block 
 * @param {*} tx 
 * @param {*} NETWORK 
 */
function storeWithdrawalEvent(eve, block, tx, NETWORK) {
  const sql = `INSERT INTO withdrawal (player, amount, fee, block, tx, category) VALUES("${eve.player}", "${eve.amount}", "${eve.fee}", ${block}, "${tx}", "${NETWORK}")`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert withdrawal event ${NETWORK}`, err)
        j(err)
      } else {
        const procedure = `CALL findParent("${eve.player}", 0, 0, ${eve.amount})`
        connection.query(procedure, (err, reulsts, fields) => {
          if (results.length === 0) {
            r(0)
          } else {
            r(0)
          }
        })
      }
    })
  })
}

function selectRandomPlayers(category) {
  const sql = `SELECT DISTINCT buyer FROM buy where category = "${category}" ORDER BY RAND() LIMIT 20`
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query random players of ${category}`)
        j(err)
      } else {
        r(results)
      }
    })
  })
}

function updateReferer(referral, id, category) {
  const sql = `INSERT INTO referer (player, referer, category) VALUES("${referral}", ${id}, "${category}") ON DUPLICATE KEY UPDATE referer=${id})`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert referer event ${category}`, err)
        j(err)
      } else {
        const procedure = `CALL findParent("${referral}", 1, 0, 0)`
        connection.query(procedure, (err, reulsts, fields) => {
          if (results.length === 0) {
            r(0)
          } else {
            r(0)
          }
        })
      }
    })
  })
}

function updateRegister(user, id, referer, category) {
  const sql = `INSERT INTO referer (player, refId, referer, category) VALUES("${user}", ${id}, ${referer}, "${category}" ON DUPLICATE KEY UPDATE refId=${id}, referer = ${referer})`
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to insert referer event ${category}`, err)
        j(err)
      } else {
        if (referer !== 0) {
          const procedure = `CALL findParent("${user}", 1, 0, 0)`
          connection.query(procedure, (err, reulsts, fields) => {
            if (results.length === 0) {
              r(0)
            } else {
              r(0)
            }
          })
        } else {
          r(0)
        }
      }
    })
  })
}

function loadGStat(user, category) {
  const sql = `select * from g_stat where player="${user}" and category="${category}"`
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query ${event} of ${category}`)
        j(err)
      } else {
        r(results)
      }
    })
  })
}

function loadEventData(event, category) {
  const sql = `select * from ${event} where category = "${category}"`
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query ${event} of ${category}`)
        j(err)
      } else {
        r(results)
      }
    })
  })
}

module.exports = {
  startBlock,
  curBlock,
  storeLuckyEvent,
  storeReferEvent,
  storeBuyEvent,
  storeWithdrawalEvent,
  selectRandomPlayers,
  updateEventBlock,
  updateReferer,
  updateRegister,
  loadGStat,
  loadEventData
}
