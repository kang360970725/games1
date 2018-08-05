'use strict'

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : {'default': obj}
}

function Fp3d (address, web3, callback) {
  var self = this
  self.web3 = web3, self.c = new Contract(web3.eth.contract(abi).at(address)), self.params = {}
  var props = ['a', 'b', 'ta', 'tb', 'tc', 'wa', 'wb', 'wc']
  async.each(props, function (prop, callback) {
    self.c[prop]().then(function (_propValue) {
      self.params[prop] = _propValue, callback()
    })
  }, callback)
}

function getFp3d (web3) {
  return deployed.fp3d.hasOwnProperty(web3.version.network) ? new _promise2['default'](function (r, j) {
    var fp3d = new Fp3d(deployed.fp3d[web3.version.network], web3, function (err) {
      err ? j(err) : r(fp3d)
    })
  }) : _promise2['default'].reject(errors.UNSUPPORTED_NETWORK)
}

var _promise = require('babel-runtime/core-js/promise'), _promise2 = _interopRequireDefault(_promise),
  deployed = require('./deployed'), errors = require('./errors'), abi = require('./abi').fp3d,
  Contract = require('./contract'), async = require('async')
Fp3d.prototype.getFinalizeTime = function () {
  return this.c.finalizeTimestamp()
}, Fp3d.prototype.price = function (n) {
  var self = this
  return self.params.a.mul(n).add(self.params.b).dividedBy(Math.pow(10, 18))
}, Fp3d.prototype.keyTh = function () {
  return this.c.keyTh()
}, Fp3d.prototype.round = function () {
  return this.c.round()
}, Fp3d.prototype.buy = function (value, ref) {
  return value = value.mul(Math.pow(10, 18)), ref || (ref = 0), this.c.BuyKeys(ref, {value: value})
}, Fp3d.prototype.pool = function () {
  return this.c.pool()
}, Fp3d.prototype.soldKeys = function () {
  return this.c.soldKeys()
}, Fp3d.prototype.watermark = function () {
  return this.c.watermark()
}, Fp3d.prototype.register = function () {
  return this.c.register()
}, Fp3d.prototype.stat = function (address) {
  var stat = {}, self = this
  return self.c.owned(address).then(function (_owned) {
    return stat.owned = _owned.toNumber(), self.c.wallet(address)
  }).then(function (_wallet) {
    return stat.wallet = _wallet.dividedBy(Math.pow(10, 18)).toNumber().toFixed(8), self.c.Bonus(address)
  }).then(function (_bonus) {
    return stat.bonus = _bonus.dividedBy(Math.pow(10, 18)).toNumber().toFixed(8), self.c.playerRefs(address)
  }).then(function (_ref) {
    stat.ref = _ref.toNumber()
  }).then(function () {
    return stat
  })
}, Fp3d.prototype.withdrawal = function () {
  return this.c.withdrawal()
}, Fp3d.prototype.currentWinner = function () {
  return this.c.currentWinner()
}, Fp3d.prototype.finalize = function () {
  return this.c.finalize()
}, exports.getFp3d = getFp3d
