const deployed = require('../src/lib/deployed')
const abis = require('../src/lib/abi')
const NETWORK = process.env.NETWORK
const errors = require('../src/lib/errors')

exports.getFp3d = function(web3) {
  if (deployed.fp3dM.hasOwnProperty(NETWORK)) {
    const fp3d = new web3.eth.Contract(abis.f3dMod, deployed.fp3dM[NETWORK])
    return Promise.resolve(fp3d)
  } else {
    return Promise.reject(errors.UNSUPPORTED_NETWORK)
  }
}