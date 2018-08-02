//return the start block of a event of category

const mysql      = require('mysql');
const dbConf = require("../../config/db.config.json")

const connection = mysql.createPool(dbConf);

const _startBlocks = require('../../src/lib/deployed').fp3dM_deploy

function startBlock(event, category) {
  return _startBlocks[category]
}

function curBlock(event, catetory) {
  const sql = `SELECT block FROM status WHERE category = "${catetory}" AND event = "${event}" `
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query start block of ${event} ${catetory}`, err)
        j(err)
      } else {
        if (results.length === 0) {
          r(0)
        } else if(results.length !== 1) {
          throw `${event} ${cateogry} has more than one record`
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
  const sql = `INSERT INTO referer (player, referer) VALUES("${eve.referral}", "${eve.pUser}")`
  console.log(sql)
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query start block of ${event} ${catetory}`, err)
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
  const sql = `INSERT INTO referer (player, referer) VALUES("${eve.referral}", "${eve.pUser}")`
  console.log(sql)
  console.log(sql)
  return new Promise((r, j) => {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`fail to query start block of ${event} ${catetory}`, err)
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
        console.error(`fail to query start block of ${event} ${catetory}`, err)
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

module.exports = {
  startBlock,
  curBlock,
  storeLuckyEvent,
  updateEventBlock
}
