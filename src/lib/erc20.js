const Contract = require('./contract')
const abis = require('./abi')
const errors = require('./errors')

function erc20At(address, web3) {
  if (web3.isAddress(address)) {
    let erc20abi
    if (address.toLowerCase().trim() === '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0') {
      erc20abi = abis.eos
    } else {
      erc20abi = abis.erc20
    }

    let c = web3.eth.contract(erc20abi)
    c = c.at(address)
    c = new Contract(c)
    return c.totalSupply()
      .then(() => {
        return c
      })
      .catch(err => {
        console.log(`fail to get erc20 totalSupply ${err}`)
        return Promise.reject(errors.NOT_ERC20)
      })
  } else {
    return Promise.reject(errors.INVALID_ADDRESS)
  }
}

function erc20Stat(erc20, owner) {
  const stat = {
    totalSupply: 0,
    address: null,
    symbol: null,
    decimals: 0,
    balance: 0
  }

  return erc20.decimals()
    .then(_decimal => {
      stat.decimals = _decimal.toNumber()
      return erc20.totalSupply()
    })
    .then(_supply => {
      stat.totalSupply = _supply.dividedBy(Math.pow(10, stat.decimals))
      return erc20.symbol()
    })
    .then(_symbol => {
      stat.symbol = _symbol
      stat.address = erc20.instance.address
      if (owner) {
        return erc20.balanceOf(owner)
          .then(_balance => {
            stat.balance = _balance.dividedBy(Math.pow(10, stat.decimals))
            return stat
          })
      } else {
        return stat
      }
    })
}

exports.erc20At = erc20At
exports.erc20Stat = erc20Stat
