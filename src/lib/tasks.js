const errors = require('./errors')
const Tx = require('ethereumjs-tx')
const Deployed = require('./deployed')
const erc20 = require('./erc20')
const abi = require('./abi')

const _types = require('./tx').TYPES

const _state = [
  'NONE',
  'READY',
  'WAIT_FOR_SCHEDULE',
  'WAIT_FOR_FUND',
  'DOING',
  'DONE',
  'PAUSE',
  'ERROR',
  'CANCELED'
]

const STATE = {}

_state.forEach((e, i) => {
  STATE[e] = i
})

// context.web3
async function runTask(task, context) {
  let result
  switch (task.type) {
    case _types.AIRDROP:
      result = await airdrop(task, context)
      break
    default:
      result = { state: STATE.ERROR, error: errors.UNKNOWN_TASK_TYPE }
  }

  return result
}

// task:
// 1. nonce
// 2. address
// 3. gasPrice

// task.data:
// 1. token
// 2. addresses []
// 3. amount

// context
// 1. web3
// 2. secret
// 3. network

async function airdrop(task, context) {
  const data = task.data
  const token = data.token
  const addresses = data.addresses
  const amount = new web3.BigNumber(data.amount)

  const nonce = task.nonce
  const sender = task.address
  const gasPrice = task.gasPrice

  const secret = context.secret
  const web3 = context.web3
  const network = context.network

  if (!web3.isAddress(token)) {
    return {
      state: STATE.ERROR,
      error: errors.INVALID_ADDRESS
    }
  }

  if (addresses.length === 0) {
    return {
      state: STATE.ERROR,
      error: errors.MISS_PARAMETER
    }
  }

  if (amount.lte(0)) {
    return {
      state: STATE.ERROR,
      error: errors.MISS_PARAMETER
    }
  }

  return erc20.erc20At(token, web3)
    .then(_tokenC => {
      return erc20.erc20Stat(_tokenC, sender)
    })
    .then(_tokenStat => {
      const total = amount.mul(addresses.length)
      if (total.gt(_tokenStat.balance)) {
        return Promise.reject(errors.TOKEN_NOT_ENOUGH)
      }

      const airdropC = web3.eth.contract(abi.airdrop).at(Deployed.airdrop[network])
      return airdropC
    })
    .then(airdropC => {
      return airdropC.getFee({ from: sender })
        .then(_fee => {
          const data = airdropC.drop.getData(
            token,
            addresses,
            amount
          )

          const tx = {
            to: token,
            from: sender,
            value: web3.toHex(_fee),
            data: data,
            nonce,
            gasPrice: web3.toHex(gasPrice)
          }

          return web3.eth.estimageGas(tx)
            .then(_gas => {
              const ethGas = gasPrice * _gas
              return web3.eth.getBalance(sender)
                .then(_bal => {
                  if (_bal.lt(ethGas)) {
                    return Promise.reject(errors.BALANCE_NOT_ENOUGH)
                  } else {
                    return new Tx(tx)
                  }
                })
            })
        })
        .then(_tx => {
          _tx.sign(secret)
          const s = '0x' + _tx.serialize().toString('hex')
          return web3.eth.sendRawTransaction(s)
        })
        .then(_txhash => {
          return {
            state: STATE.DOING,
            error: null
          }
        })
        .catch(err => {
          if (errors.hasOwnProperty(err)) {
            return {
              state: STATE.ERROR,
              error: err
            }
          } else {
            console.log(`fail to do airdrop ${err}`)
            return {
              state: STATE.ERROR,
              error: errors.RPC_ERROR
            }
          }
        })
    })
}

exports.TYPES = _types
exports.STATE = STATE
exports.runTask = runTask

