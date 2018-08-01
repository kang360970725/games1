const bin = require('./bin')
const abi = require('./abi')
const errors = require('./errors')
const deployed = require('./deployed')
const Contract = require('./contract')

exports.deployActivity = function(token, n, m, decimals, web3) {
  // change n to n * decimals
  let _n = new web3.BigNumber(n)
  _n = _n.mul(Math.pow(10, decimals))

  let _m = new web3.BigNumber(m)
  _m = _m.mul(Math.pow(10, decimals))
  _m = _m.dividedToIntegerBy(Math.pow(10, 12))

  return new Promise((r, j) => {
    const c = web3.eth.contract(abi.activity)
    const data = c.new.getData(
      token,
      _n,
      _m,
      {
        data: bin.activity
      }
    )

    web3.eth.estimateGas({ data }, (err, gas) => {
      if (err) {
        j(err)
      } else {
        web3.eth.sendTransaction({ data, gas }, (err, res) => {
          if (err) {
            j(err)
          } else {
            r(res)
          }
        })
      }
    })
  })
}

exports.activityAt = function(address, web3) {
  let c = web3.eth.contract(abi.activity).at(address)
  c = new Contract(c)
  return c
}

function generator(web3) {
  return new Promise((r, j) => {
    web3.version.getNetwork((err, net) => {
      if (err) {
        console.log(`fail to get network ${err.message ? err.message : err}`)
        j(errors.NETWORK_UNCONNECTED)
      } else {
        r(net)
      }
    })
  })
    .then(network => {
      if (deployed.actGenerator.hasOwnProperty(network)) {
        let c = web3.eth.contract(abi.actGenerator).at(deployed.actGenerator[network])
        c = new Contract(c)
        return c
      } else {
        return Promise.reject(errors.UNSUPPORTED_NETWORK)
      }
    })
}

exports.generator = generator

exports.getnActivity = function(token, n, m, decimals, web3) {
  let _n = new web3.BigNumber(n)
  _n = _n.mul(Math.pow(10, decimals))

  let _m = new web3.BigNumber(m)
  _m = _m.mul(Math.pow(10, decimals))
  _m = _m.dividedToIntegerBy(Math.pow(10, 12))

  return generator(web3)
    .then(actGen => {
      return actGen.price()
        .then(_p => {
          return actGen.genSendN(
            token,
            _n,
            _m,
            { value: _p }
          )
        })
    })
}
