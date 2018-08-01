const ethState = {
  frontEnd: true,
  web3Connect: false
}

const ERR_CODES = require('./errors')
let inited = false
function initEnv(web3) {
  if (inited) {
    return Promise.resolve(ethState)
  }

  if (typeof web3 === 'undefined') {
    return Promise.reject(ERR_CODES.WEB3_MISS)
  }
  if (typeof window !== 'undefined') {
    ethState.frontEnd = true
  } else {
    ethState.frontEnd = false
  }

  if (web3.hasOwnProperty('__proxy__')) {
    ethState.web3Connect = false
  } else {
    ethState.web3Connect = true
  }

  ethState.web3 = web3

  return new Promise((r, j) => {
    web3.version.getNetwork((err, net) => {
      if (err) {
        console.log(`fail to get network ${err}`)
        return j(ERR_CODES.NETWORK_UNCONNECTED)
      } else {
        ethState.network = net
        return r(ethState)
      }
    })
  })
    .then(() => {
      const address = web3.eth.defaultAccount
      console.log(`account ${address}`)
      if (web3.isAddress(address)) {
        ethState.address = address
        ethState.BigNumber = ethState.web3.BigNumber
        return ethState
      } else {
        return Promise.reject(ERR_CODES.ACCOUNT_LOCKED)
      }
    })
    .then(state => {
      inited = true
      return state
    })
}

function getEthBalance() {
  if (ethState.hasOwnProperty('web3')) {
    const web3 = ethState.web3
    if (ethState.hasOwnProperty('address') && web3.isAddress(ethState.address)) {
      return new Promise((r, j) => {
        web3.eth.getBalance(ethState.address, (err, b) => {
          if (err) {
            console.log(`fail to get eth balance`, err)
            return j(ERR_CODES.RPC_ERROR)
          } else {
            return r(b)
          }
        })
      })
        .then(_balance => {
          return web3.fromWei(_balance)
        })
    } else {
      return Promise.reject(ERR_CODES.ACCOUNT_LOCKED)
    }
  } else {
    return Promise.reject(ERR_CODES.NETWORK_UNCONNECTED)
  }
}
// exports.Init = initEnv
// exports.STATE = ethState
exports.Init = initEnv
exports.STATE = ethState
exports.getEthBalance = getEthBalance
// { initEnv as Init, ethState as STATE }

const ETHERSCAN = {
  '1': 'https://etherscan.io',
  '3': 'https://ropsten.etherscan.io',
  '4': 'https://rinkeby.etherscan.io/'
}

function _txEtherscan(networkId, txHash) {
  return `${ETHERSCAN[networkId]}/tx/${txHash}`
}

exports.txOnEtherscan = function(txid) {
  return _txEtherscan(ethState.network, txid)
}

function _contractEtherscan(networkId, address) {
  return `${ETHERSCAN[networkId]}/address/${address}`
}

exports.contractOnEtherscan = function(address) {
  return _contractEtherscan(ethState.network, address)
}

exports.getBalanceOf = function(address) {
  return new Promise((r, j) => {
    ethState.web3.eth.getBalance(address, (err, balance) => {
      if (err) {
        console.log(`fail to get balance of user ${address} ${err}`)
        j(ERR_CODES.RPC_ERROR)
      } else {
        r(balance)
      }
    })
  })
}

export function getAuth() {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now().toString()
    ethState.web3.personal.sign(ethState.web3.sha3(timestamp), ethState.address, (err, key) => {
      if (err) {
        reject(err)
      } else {
        resolve({ key, timestamp, address: ethState.address })
      }
    })
  })
}
