const deployed = require('./deployed')
const errors = require('./errors')
const abi = require('./abi').fp3d2
const Contract = require('./contract')
const async = require('async')
function Fp3d(address, web3, callback) {
  const self = this
  self.web3 = web3
  self.c = new Contract(web3.eth.contract(abi).at(address))
  self.params = {}
  const props = ['a', 'b', 'ta', 'tb', 'tc', 'td', 'te', 'wa', 'wb', 'wc', 'wd', 'we', 'decimals', 'maxTimeRemain', 'timeGap']

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

Fp3d.prototype.remainSeconds = function() {
  return this.c.remainTime()
}

Fp3d.prototype.price = function(n) {
  const self = this
  return self.c.Price(n)
}

Fp3d.prototype.round = function() {
  return this.c.currentRound()
}

Fp3d.prototype.buy = function(value, ref) {
  value = value.mul(Math.pow(10, 18))
  if (!ref) {
    ref = 0
  }
  return this.c.BuyKeys(ref, { value })
}

Fp3d.prototype.reloadKeys = function(value, ref) {
  return this.c.ReloadKeys(value, ref)
}

Fp3d.prototype.currentRound = function() {
  return this.c.currentRound()
    .then(_round => {
      return this.c.rounds(_round)
    })
}


Fp3d.prototype.register = function(ref) {
  return this.c.register(ref)
}

/**
 * return all the stats about current fp3d
 * @param {*} address 
 */
Fp3d.prototype.stat = function(address) {
  const stat = {}
  const self = this

  return self.c.currentRound()
    .then(_currentRound => {
      stat.currentRound = _currentRound.toNumber()
      return self.c.owner()
    })
    .then(_owner => {
      stat.owner = _owner
      return self.c.decimals()
    })
    .then(_decimals => {
      stat.decimals = _decimals.toNumber()
      return self.c.rounds(stat.currentRound)
    })
    .then(_round => {
      stat.round_eth = _round[0].dividedBy(Math.pow(10, 18)).toNumber()
      stat.round_keys = _round[1].dividedBy(stat.decimals).toNumber()
      stat.mask = _round[2]
      stat.winner = _round[3]
      stat.pool = _round[4].dividedBy(Math.pow(10, 18)).toNumber()
      return self.c.playerIds(address)
    })
    .then(_id => {
      if (_id.eq(0) && address !== stat.owner) {
        stat.id = -1
      } else {
        stat.id = _id.toNumber()
        return self.c.players(_id)
          .then(_player => {
            // stat.wallet = _player[1].dividedBy(Math.pow(10, 18)).toNumber()
            stat.affiliate = _player[2].dividedBy(Math.pow(10, 18)).toNumber()
            stat.win = _player[3].dividedBy(Math.pow(10, 18)).toNumber()
            return self.c.playerRoundData(stat.id, stat.currentRound)
          })
          .then(_playerRound => {
            stat.player_eth = _playerRound[0].dividedBy(Math.pow(10, 18)).toNumber()
            stat.player_keys = _playerRound[1].dividedBy(stat.decimals).toNumber()
            return self.c.profit({from: address})
          })
          .then(_profit => {
            stat.profit = _profit.dividedBy(Math.pow(10, 18)).toNumber()
            stat.wallet = stat.profit - stat.affiliate - stat.win
          })
      }
    })
    .then(() => {
      return stat
    })
}

Fp3d.prototype.withdrawal = function(ref) {
  return this.c.withdrawal(ref)
}

Fp3d.prototype.finalize = function(ref) {
  return this.c.finalize(ref)
}

Fp3d.prototype.maxTimeRemain = function() {
  return this.c.maxTimeRemain()
}

Fp3d.prototype.loadWinners = function() {
  const self = this
  return self.c.currentRound()
    .then(_round => {
      return new Promise((r, j) => {
        async.times(
          _round.toNumber() - 1,
          (i, callback) => {
            self.c.rounds(i + 1, callback)
          },
          (err, rounds) => {
            if (err) {
              console.log(`fail to load round data`, err)
              return j(err)
            } else {
              rounds = rounds.map((r, i) => {
                const winner = r[3]
                const amount = r[4].dividedBy(Math.pow(10, 18)).toNumber()  //.mul(self.params.wa)
                return { round: i + 1, winner, amount }
              })
              r(rounds)
            }
          })
      })
    })
}

function getFp3d(web3) {
  if (deployed.fp3d2.hasOwnProperty(web3.version.network)) {
    return new Promise((r, j) => {
      const fp3d = new Fp3d(deployed.fp3d2[web3.version.network], web3, (err) => {
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
