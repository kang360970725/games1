//based on fp3d to read events
const Store = require('./store')
const utils = require('../utils')

const EVENTS = {
  REFERER: 'referer'
}

const NETWORK = process.env.NETWORK
const luckyEvents = []
const referEvents = []


function Init(fp3d) {
  //fp3d.web3
  //fp3d.c.instance
  initReferEvents(fp3d)
}

function initReferEvents(fp3d) {
  let fromBlock = Store.curBlock(EVENTS.REFERER, NETWORK)
  if (fromBlock === 0) {
    fromBlock = Store.startBlock(EVENTS.REFERER, NETWORK)
  }

  fp3d.getPastEvents('Referer', { fromBlock, toBlock:'latest'})
    .then(events => {
      console.log(events)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = Init
