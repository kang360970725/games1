const deployed = require('./deployed')
const abi = require('./abi')
const Contract = require('./contract')

function BatchControl(state) {
  const self = this
  self.web3 = state.web3
  self.c = new Contract(self.web3.eth.contract(abi.batchControl).at(deployed.batchContorl[state.network]))
}

BatchControl.prototype.price = function() {
  const self = this
  return self.c.price()
    .then(_price => {
      return self.web3.fromWei(_price, 'ether')
    })
}

BatchControl.prototype.buy = function(n) {
  const self = this
  return self.c.price()
    .then(_price => {
      const total = _price.mul(n)
      return self.c.buy(n, { value: total })
    })
}

module.exports = BatchControl
