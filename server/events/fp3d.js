//based on fp3d to read events
const Store = require('./store')
const utils = require('../utils')

const EVENTS = require('./events')

const NETWORK = process.env.NETWORK
const luckyEvents = []
const referEvents = []


async function Init(fp3d, web3) {
  //fp3d.web3
  //fp3d.c.instance
  let latestBlock
  while(true) {
    console.log(`gather data in new round`)
    latestBlock = await web3.eth.getBlockNumber()
    console.log(`init with latest block`, latestBlock)
    /*
    await initReferEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load refer events`, err)
      })*/
    await initLuckyEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load lucky events`, err)
      })
      /*
    await initBuyEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load buy events`, err)
      })
    await initWithdrawalEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load withdrawal events`, err)
      })
    await initRegisterEvents(fp3d, latestBlock)
      .catch(err => {
        console.log(`fail to load withdrawal events`, err)
      })*/
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
            console.log(eve)
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

async function initWithdrawalEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.BUY, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.BUY, NETWORK)
  }

  return fp3d.getPastEvents('Withdrawal', { fromBlock, toBlock:latest})
    .then(async events => {
      try {
          events.forEach(async eve => {
            let block = eve.blockNumber
            let tx = eve.transactionHash
            eve = eve.returnValues
            let { player, amount, fee } = eve

            await Store.storeWithdrawalEvent(eve, block, tx, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.WITHDRAWAL, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

async function initRefererEvents(fp3d, latest) {
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

            await Store.updateReferer(referral, pUser, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.REGISTER, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

async function initRegisterEvents(fp3d, latest) {
  let fromBlock = await Store.curBlock(EVENTS.REGISTER, NETWORK)
  if (fromBlock === 0) {
    fromBlock = await Store.startBlock(EVENTS.REGISTER, NETWORK)
  }

  return fp3d.getPastEvents('Register', { fromBlock, toBlock:latest})
    .then(async events => {
      try {
          events.forEach(async eve => {
            let block = eve.blockNumber
            let tx = eve.transactionHash
            eve = eve.returnValues
            let { user, id, ref } = eve

            await Store.updateRegister(user, id, ref, NETWORK)
          })
          return await Store.updateEventBlock(EVENTS.REGISTER, NETWORK, latest)
      } catch (err) {
        console.error(err)
      }
    })
}

module.exports = Init
