const errors = require('./errors')

exports.getBalance = function(address, web3) {
  return new Promise((r, j) => {
    web3.eth.getBalance(address, (err, balance) => {
      if (err) {
        console.log(`fail to get balance of user ${address} ${err}`)
        j(errors.RPC_ERROR)
      } else {
        r(balance)
      }
    })
  })
}

const error_zh = require('./lang.zh').error_zh
exports.zh = function(err) {
  if (error_zh.hasOwnProperty(err)) {
    return error_zh[err]
  } else {
    return '未知错误'
  }
}

