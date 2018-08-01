const deployed = require('./deployed')
const errors = require('./errors')
const abi = require('./abi').fp3d
const Contract = require('./contract')
const async = require('async')
function Fp3d(address, web3, callback) {
  const self = this
  self.web3 = web3
  self.c = new Contract(web3.eth.contract(abi).at(address))
  self.params = {}
  const props = ['a', 'b', 'ta', 'tb', 'tc', 'wa', 'wb', 'wc']

  async.each(
    props,
    (prop, callback) => {
      self.c[prop]()
        .then(_propValue => {
          self.params[prop] = _propValue
          callback()
        })
    },
    callback
  )
}

Fp3d.prototype.getFinalizeTime = function() {
  return this.c.finalizeTimestamp()
}

Fp3d.prototype.price = function(n) {
  const self = this
  return self.params.a.mul(n).add(self.params.b).dividedBy(Math.pow(10, 18))
}

Fp3d.prototype.keyTh = function() {
  return this.c.keyTh()
}

Fp3d.prototype.round = function() {
  return this.c.round()
}

Fp3d.prototype.buy = function(value, ref) {
  value = value.mul(Math.pow(10, 18))
  if (!ref) {
    ref = 0
  }
  return this.c.BuyKeys(ref, { value })
}

Fp3d.prototype.pool = function() {
  return this.c.pool()
}

Fp3d.prototype.soldKeys = function() {
  return this.c.soldKeys()
}

Fp3d.prototype.watermark = function() {
  return this.c.watermark()
}

Fp3d.prototype.register = function() {
  return this.c.register()
}

Fp3d.prototype.stat = function(address) {
  const stat = {}
  const self = this
  return self.c.owned(address)
    .then(_owned => {
      stat.owned = _owned.toNumber()
      return self.c.wallet(address)
    })
    .then(_wallet => {
      stat.wallet = _wallet.dividedBy(Math.pow(10, 18)).toNumber().toFixed(8)
      return self.c.Bonus(address)
    })
    .then(_bonus => {
      stat.bonus = _bonus.dividedBy(Math.pow(10, 18)).toNumber().toFixed(8)
      return self.c.playerRefs(address)
    })
    .then(_ref => {
      stat.ref = _ref.toNumber()
    })
    .then(() => {
      return stat
    })
}

Fp3d.prototype.withdrawal = function() {
  return this.c.withdrawal()
}

Fp3d.prototype.currentWinner = function() {
  return this.c.currentWinner()
}

Fp3d.prototype.finalize = function() {
  return this.c.finalize()
}

function getFp3d(web3) {
  if (deployed.fp3d.hasOwnProperty(web3.version.network)) {
    return new Promise((r, j) => {
      const fp3d = new Fp3d(deployed.fp3d[web3.version.network], web3, (err) => {
        if (err) {
          j(err)
        } else {
          r(fp3d)
        }
      })
    })
  } else {
    return Promise.reject(errors.UNSUPPORTED_NETWORK)
  }
}

exports.getFp3d = getFp3d
