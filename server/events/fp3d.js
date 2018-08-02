//based on fp3d to read events
const Store = require('./store')
const utils = require('../utils')

const EVENTS = {
  REFERER: 'referer',
  LUCKY: 'lucky'
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
        console.log(`fail to load refer events`)
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
      events.forEach(async eve => {
        let block = eve.blockNumber
        let tx = eve.transactionHash
        eve = eve.returnValues
        let { referral, pUser } = eve

        await Store.storeReferEvent(eve, block, tx, NETWORK)
      })

      return await Store.updateEventBlock(EVENTS.REFERER, NETWORK, latest)
    })
}

async function initLuckyEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.LUCKY, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.LUCKY, NETWORK)
  }

  return fp3d.getPastEvents('Lucky', { fromBlock, toBlock:latest})
    .then(async events => {
      events.forEach(async eve => {
        let block = eve.blockNumber
        let tx = eve.transactionHash
        eve = eve.returnValues
        let { buyer, round, lucky, acmount } = eve

        await Store.storeLuckyEvent(eve, block, tx, NETWORK)
      })
      
      return await Store.updateEventBlock(EVENTS.LUCKY, NETWORK, latest)
    })
}

module.exports = Init
