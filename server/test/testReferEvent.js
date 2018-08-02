const Web3 = require('web3')
const web3 = new Web3()
const utils = require('../utils')

const EventLogger = require('../events/fp3d')
web3.setProvider(new web3.providers.HttpProvider(`https://ropsten.infura.io/vAugb8H4cG1bOuFMZj3y`))

utils.getFp3d(web3)
  .then(_fp3d => {
    EventLogger(_fp3d)
  })