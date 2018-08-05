"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {"default": obj}
}

function Fp3dMod(address, web3, callback) {
  var self = this;
  self.web3 = web3, self.c = new Contract(web3.eth.contract(abi.f3dMod).at(address)), self.params = {};
  var props = ["luckyNumber", "toSpread", "toOwner", "toNext", "toRefer", "toPool", "toLucky", "timeIncrease", "maxRound", "registerFee", "withdrawFee", "minimumWithdraw", "admin", "decimals", "owner1", "owner2"];
  async.each(props, function (prop, callback) {
    self.c[prop]().then(function (_value) {
      self.params[prop] = _value, callback()
    })
  }, callback)
}

function getFp3d(web3) {
  return deployed.fp3dM.hasOwnProperty(web3.version.network) ? new _promise2["default"](function (r, j) {
    var fp3d = new Fp3dMod(deployed.fp3dM[web3.version.network], web3, function (err) {
      err ? j(err) : r(fp3d)
    })
  }) : _promise2["default"].reject(errors.UNSUPPORTED_NETWORK)
}

var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise),
  abi = require("./abi"), Contract = require("./contract"), async = require("async"), errors = require("./errors"),
  deployed = require("./deployed");
Fp3dMod.prototype.round = function (i) {
  return this.c.rounds(i).then(function (_round) {
    return {
      eth: _round[0],
      keys: _round[1],
      mask: _round[2],
      winner: _round[3],
      pool: _round[4],
      minimumPool: _round[5],
      nextLucky: _round[6],
      luckyCounter: _round[7],
      luckyPool: _round[8],
      endTime: _round[9],
      roundTime: _round[10],
      activated: _round[12],
      finalized: _round[11]
    }
  })
}, Fp3dMod.prototype.remainTime = function (round) {
  return this.c.remainTime(round)
}, Fp3dMod.prototype.player = function (addr) {
  return this.c.players(addr).then(function (_player) {
    return {}
  })
}, Fp3dMod.prototype.totalProfit = function (addr) {
  return this.c.totalProfit(addr)
}, Fp3dMod.prototype.profit = function (addr) {
  return this.c.profit(addr)
}, Fp3dMod.prototype.withdrawal = function (addr) {
  var self = this;
  return self.totalProfit(addr).then(function (_profit) {
    return _profit.lt(self.params.minimumWithdraw) ? _promise2["default"].reject(errors.BALANCE_NOT_ENOUGH) : self.c.withdrawal()
  })
}, Fp3dMod.prototype.ethForKey = function (keys, round) {
  var self = this;
  return self.c.priceForKeys(keys, round)
}, Fp3dMod.prototype.finalize = function (round) {
  var self = this;
  return self.c.finalize(round)
}, Fp3dMod.prototype.register = function (ref) {
  var self = this;
  return self.c.register(ref, {value: self.params.registerFee})
}, Fp3dMod.prototype.buy = function (round, value, ref) {
  var self = this;
  return self.c.BuyKeys(ref, round, {value: value})
}, Fp3dMod.prototype.reload = function (round, value, ref) {
  var self = this;
  return self.c.ReloadKeys(ref, round, value)
}, Fp3dMod.prototype.start1stRound = function () {
  return this.c.start1stRound()
}, Fp3dMod.prototype.loadAllRound = function () {
  var self = this;
  return new _promise2["default"](function (r, j) {
    async.times(self.params.maxRound.toNumber(), function (i, callback) {
      self.round(i).then(function (round) {
        return callback(null, round)
      })["catch"](function (err) {
        return callback(err)
      })
    }, function (err, rounds) {
      err ? j(err) : r(rounds)
    })
  })
}, Fp3dMod.prototype.loadPlayerAllRound = function (address) {
  var self = this;
  return new _promise2["default"](function (r, j) {
    async.times(self.params.maxRound.toNumber(), function (i, callback) {
      self.c.playerRoundData(address, i).then(function (_data) {
        callback(null, {
          eth: _data[0].dividedBy(Math.pow(10, 18)).toNumber(),
          keys: _data[1].dividedBy(Math.pow(10, 18)).toNumber(),
          mask: _data[2].toNumber(),
          lucky: _data[3].dividedBy(Math.pow(10, 18)).toNumber(),
          affiliate: _data[4].dividedBy(Math.pow(10, 18)).toNumber(),
          win: _data[5].dividedBy(Math.pow(10, 18)).toNumber()
        })
      })
    }, function (err, roundData) {
      err ? j(err) : r(roundData)
    })
  })
}, Fp3dMod.prototype.roundProfit = function (addr, round) {
  return this.c.roundProfit(addr, round)
}, Fp3dMod.prototype.userReferId = function (addr) {
  return this.c.playerIds(addr)
}, exports.getFp3d = getFp3d;
