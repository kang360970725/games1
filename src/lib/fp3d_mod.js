const abi = require('./abi')
const Contract = require('./contract')
const async = require('async')
const errors = require('./errors')
const deployed = require('./deployed')

function Fp3dMod(address, web3, callback) {
  const self = this
  self.web3 = web3
  self.c = new Contract(web3.eth.contract(abi.f3dMod).at(address))

  self.params = {}

  const props = [
    'luckyNumber',
    'toSpread',
    'toOwner',
    'toNext',
    'toRefer',
    'toPool',

    'toLucky',

    'timeIncrease',
    'maxRound',
    'registerFee',
    'withdrawFee',
    'minimumWithdraw',
    'admin',
    'decimals',

    'owner1',
    'owner2'
  ]

  async.each(
    props,
    (prop, callback) => {
      self.c[prop]()
        .then(_value => {
          self.params[prop] = _value
          callback()
        })
    },
    callback
  )
}


Fp3dMod.prototype.round = function(i) {
  return this.c.rounds(i)
    .then(_round => {
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
}

Fp3dMod.prototype.remainTime = function(round) {
  return this.c.remainTime(round)
}

Fp3dMod.prototype.player = function(addr) {
  return this.c.players(addr)
    .then(_player => {
      return {
        
      }
    })
}

Fp3dMod.prototype.totalProfit = function(addr) {
  return this.c.totalProfit(addr)
}

Fp3dMod.prototype.profit = function(addr) {
  return this.c.profit(addr)
}

Fp3dMod.prototype.withdrawal = function(addr) {
  const self = this
  return self.totalProfit(addr)
    .then(_profit => {
      if(_profit.lt(self.params.minimumWithdraw)) {
        // u can't withdraw
        return Promise.reject(errors.BALANCE_NOT_ENOUGH)
      } else {
        return self.c.withdrawal()
      }
    })
}

Fp3dMod.prototype.ethForKey = function(keys, round) {
  const self = this
  return self.c.priceForKeys(keys, round)
}

Fp3dMod.prototype.finalize = function(round) {
  const self = this
  return self.c.finalize(round)
}

Fp3dMod.prototype.register = function(ref) {
  const self = this
  return self.c.register(ref, {
    value: self.params.registerFee
  })
}

Fp3dMod.prototype.buy = function(round, value, ref) {
  const self = this
  return self.c.BuyKeys(ref, round, { value })
}

Fp3dMod.prototype.reload = function(round, value, ref) {
  const self = this
  return self.c.ReloadKeys(ref, round, value)
}

Fp3dMod.prototype.start1stRound = function() {
  return this.c.start1stRound()
}

Fp3dMod.prototype.loadAllRound = function() {
  const self = this
  return new Promise((r, j) => {
    async.times(
      self.params.maxRound.toNumber(),
      (i, callback) => {
        self.round(i)
          .then(round => {
            return callback(null, round)
          })
          .catch(err => {
            return callback(err)
          })
      },
      (err, rounds) => {
        if (err) {
          j(err)
        } else {
          r(rounds)
        }
      }
    )
  })
}

Fp3dMod.prototype.loadPlayerAllRound = function(address) {
  const self = this
  return new Promise((r, j) => {
    async.times(
      self.params.maxRound.toNumber(),
      (i, callback) => {
        self.c.playerRoundData(address, i)
          .then(_data => {
            callback(null, {
              /*
              uint256 eth;         //eth player added to this round
              uint256 keys;        //keys player bought in this round
              uint256 mask;        //player mask in this round
              uint256 lucky;       //player lucky profit in this round
              uint256 affiliate;   //player affiliate in this round
              uint256 win;        //player pool in this round
              */
              eth: _data[0].dividedBy(Math.pow(10, 18)).toNumber(),
              keys: _data[1].dividedBy(Math.pow(10, 18)).toNumber(),
              mask: _data[2].toNumber(),
              lucky: _data[3].dividedBy(Math.pow(10, 18)).toNumber(),
              affiliate: _data[4].dividedBy(Math.pow(10, 18)).toNumber(),
              win: _data[5].dividedBy(Math.pow(10, 18)).toNumber()
            })
          })
      },
      (err, roundData) => {
        if (err) {
          console.error(`fail to load user data`, err)
          j(err)
        } else {
          r(roundData)
        }
      }
    )
  })
}

Fp3dMod.prototype.roundProfit = function(addr, round) {
  return this.c.roundProfit(addr, round)
}

Fp3dMod.prototype.userReferId = function(addr) {
  return this.c.playerIds(addr)
}

function getFp3d(web3) {
  if (deployed.fp3dM.hasOwnProperty(web3.version.network)) {
    return new Promise((r, j) => {
      const fp3d = new Fp3dMod(deployed.fp3dM[web3.version.network], web3, (err) => {
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