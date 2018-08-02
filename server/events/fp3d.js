//based on fp3d to read events
const Store = require('./store')
const utils = require('../utils')

const EVENTS = {
  REFERER: 'referer',
  LUCKY: 'lucky',
  BUY: 'buy'
}

const NETWORK = process.env.NETWORK
const luckyEvents = []
const referEvents = []


async function Init(fp3d, web3) {
  //fp3d.web3
  //fp3d.c.instance
  let latestBlock
  while(true) {
    latestBlock = await web3.eth.getBlockNumber()
    console.log(`init with latest block`, latestBlock)
    initReferEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load refer events`)
      })
    initLuckyEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load lucky events`)
      })
    initBuyEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load buy events`)
      })

    await new Promise((r, j) => {
      setTimeout(r, 5 * 30 * 1000)
    })
  }
}

async function initReferEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.REFERER, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.REFERER, NETWORK)
  }

  return fp3d.getPastEvents('Referer', { fromBlock, toBlock:latest})
    .then(async events => {
      try {
          events.forEach(async eve => {
            let block = eve.blockNumber
            let tx = eve.transactionHash
            eve = eve.returnValues
            let { referral, pUser } = eve

            await Store.storeReferEvent(eve, block, tx, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.REFERER, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

async function initLuckyEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.LUCKY, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.LUCKY, NETWORK)
  }

  return fp3d.getPastEvents('Lucky', { fromBlock, toBlock:latest})
    .then(async events => {
      try {
          events.forEach(async eve => {
            let block = eve.blockNumber
            let tx = eve.transactionHash
            eve = eve.returnValues
            let { buyer, round, lucky, acmount } = eve

            await Store.storeLuckyEvent(eve, block, tx, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.LUCKY, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

async function initBuyEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.BUY, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.BUY, NETWORK)
  }

  return fp3d.getPastEvents('Buy', { fromBlock, toBlock:latest})
    .then(async events => {
      try {
          events.forEach(async eve => {
            let block = eve.blockNumber
            let tx = eve.transactionHash
            eve = eve.returnValues
            let { buyer, keys, cost, round } = eve

            await Store.storeBuyEvent(eve, block, tx, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.BUY, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

module.exports = Init
