const erc20 = require('./erc20')
const deployed = require('./deployed')
const Contract = require('./contract')
const abi = require('./abi')

// const errors = require('./errors')

function airdrop(web3) {
  const self = this
  self.web3 = web3
  const network = web3.version.network
  const addr = deployed.airdrop[network]
  self.c = new Contract(web3.eth.contract(abi.airdrop).at(addr))
}

airdrop.prototype.dropToken = function(addrs, amount, tokenAddr, opt) {
  const self = this
  return erc20.erc20At(tokenAddr, self.web3)
    .then(token => {
      let value = new self.web3.BigNumber(amount)
      return token.decimals()
        .then(_decimals => {
          value = value.mul(Math.pow(10, _decimals))
          return self.c.getFee()
        })
        .then(_fee => {
          if (!opt) {
            opt = {}
          }
          opt.value = _fee
          return self.c.drop(
            tokenAddr,
            addrs,
            value,
            opt
          )
        })
    })
}

airdrop.prototype.dropEth = function(addrs, amount) {
  const self = this
  let value = new self.web3.BigNumber(amount)
  value = value.mul(Math.pow(10, 18))
  return self.c.getFee()
    .then(_fee => {
      let sendEth = value.mul(addrs.length)
      sendEth = sendEth.add(_fee)
      return self.c.drop(
        '0x0',
        addrs,
        value,
        { value: sendEth }
      )
    })
}

airdrop.prototype.dropTokenS = function(addrs, amounts, tokenAddr) {
  const self = this
  return erc20.erc20At(tokenAddr)
    .then(tokenC => {
      return tokenC.decimals()
    })
    .then(_decimals => {
      const m = Math.pow(10, _decimals.toNumber())
      return amounts.map(_a => {
        let _amount = new self.web3.BigNumber(_a)
        _amount = _amount.mul(m)
        return _amount
      })
    })
    .then(_v => {
      return self.c.getFee()
        .then(_fee => {
          return self.c.drop2(
            tokenAddr,
            addrs,
            _v,
            { value: _fee }
          )
        })
    })
}

airdrop.prototype.dropEthS = function(addrs, amounts) {
  const self = this
  const m = Math.pow(10, 18)
  let total = null
  return self.c.getFee()
    .then(_fee => {
      total = _fee
      return amounts.map(_a => {
        _a = new self.web3.BigNumber(_a)
        _a = _a.mul(m)
        total = total.add(_a)
        return _a
      })
    })
    .then(_v => {
      return self.c.drop2(
        '0x0',
        addrs,
        _v,
        { value: total }
      )
    })
}

airdrop.prototype.estimateSendToken = function(tokenAddr, amount, onCount) {
  // estimate the gas cost of send token directly to addrs[0]
  const self = this
  return erc20.erc20At(tokenAddr)
    .then(token => {
      let value = new self.web3.BigNumber(amount)
      return token.decimals()
        .then(_decimals => {
          value = value.mul(Math.pow(10, _decimals))
          return self.c.getFee()
        })
        .then(async _fee => {
          const address = '0x92694d5c7e2655e3f358130ebd0e7Db3FbD3e455'
          const addresses = []
          const start = 80
          for (let i = 0; i < start; i++) {
            addresses.push(address)
          }
          let n = start
          for (; ; n += 10) {
            try {
              await self.c.gasOf_drop(token, addresses, value, { value: _fee })
              onCount(n, true)
            } catch (err) {
              onCount(n, false)
              break
            }

            for (let i = 0; i < 10; i++) {
              addresses.push(address)
            }
          }

          return n - 10
        })
    })
}

airdrop.prototype.price = function() {
  const self = this
  return self.c.getFee()
    .then(_fee => {
      return self.web3.fromWei(_fee)
    })
}

airdrop.prototype.gasOfDropToken = function(addrs, amount, tokenAddr, opt) {
  const self = this
  return erc20.erc20At(tokenAddr, self.web3)
    .then(token => {
      let value = new self.web3.BigNumber(amount)
      return token.decimals()
        .then(_decimals => {
          value = value.mul(Math.pow(10, _decimals))
          return self.c.getFee()
        })
        .then(_fee => {
          opt.value = _fee
          return self.c.gasOf_drop(
            tokenAddr,
            addrs,
            value,
            opt
          )
        })
    })
}

module.exports = airdrop
