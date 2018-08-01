const errors = require('./errors')

exports.LastNGas = function(web3, n) {
  return new Promise((r, j) => {
    web3.eth.getBlock('latest', (err, block) => {
      if (err) {
        console.log(`fail to get latest block ${err}`)
        j(errors.RPC_ERROR)
      } else {
        // sample 20 transactions
        const len = block.transactions.length
        let step = 1
        if (len >= 20) {
          step = Math.floor(len / 20)
        }

        for (let i = 0; i < len; i += step) {
          const tx = block.transactions[i]
          //
        }
      }
    })
  })
}
