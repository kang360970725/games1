const errors = require('./errors')

const TX_TYPES = [
  'AIRDROP',
  'BATCH_SEND',
  'ACTIVITY',
  'ERC20',
  'APPROVE',
  'TRANSFER'
]

const TYPES = {}
TX_TYPES.forEach((e, i) => {
  TYPES[e] = i + 1
})

const TX_STATUS = [
  'DONE',
  'ERROR',
  'NONE',
  'PENDING'
]

const STATUS = {}

TX_STATUS.forEach((e, i) => {
  STATUS[e] = i
})

exports.TYPES = TYPES
exports.STATUS = STATUS

exports.tx_status = function(tx, web3) {
  const status = {

  }

  return new Promise((r, j) => {
    web3.eth.getTransaction(tx, (err, t) => {
      if (err) {
        console.log(`fail to get transaction ${tx}: ${err}`)
        j(errors.RPC_ERROR)
      } else {
        r(t)
      }
    })
  })
    .then(txObj => {
      if (typeof txObj === 'undefined') {
        status.status = STATUS.NONE
        return status
      }

      status.input = txObj.input
      if (txObj.blockNumber === null) {
        status.status = STATUS.PENDING
        return status
      }

      return new Promise((r, j) => {
        web3.eth.getTransactionReceipt(tx, (err, receipt) => {
          if (err) {
            console.log(`fail to get tx receipt ${tx}: ${err}`)
            j(errors.RPC_ERROR)
          } else {
            r(receipt)
          }
        })
      })
        .then(receipt => {
          status.status = tx.status === '0x0' ? STATUS.ERROR : STATUS.DONE
          status.contractAddress = receipt.contractAddress
          status.logs = receipt.logs
          return status
        })
    })
}
