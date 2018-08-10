"use strict";

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {"default": obj}
}

function initEnv(web3) {
  return inited ? _promise2["default"].resolve(ethState) : "undefined" == typeof web3 ? _promise2["default"].reject(ERR_CODES.WEB3_MISS) : ("undefined" != typeof window ? ethState.frontEnd = !0 : ethState.frontEnd = !1, web3.hasOwnProperty("__proxy__") ? ethState.web3Connect = !1 : ethState.web3Connect = !0, ethState.web3 = web3, new _promise2["default"](function (r, j) {
    web3.version.getNetwork(function (err, net) {
      return err ? j(ERR_CODES.NETWORK_UNCONNECTED) : (ethState.network = net, r(ethState))
    })
  }).then(function () {
    var address = web3.eth.defaultAccount;
    return web3.isAddress(address) ? (ethState.address = address, ethState.BigNumber = ethState.web3.BigNumber, ethState) : _promise2["default"].reject(ERR_CODES.ACCOUNT_LOCKED)
  }).then(function (state) {
    return inited = !0, state
  }))
}

function getEthBalance() {
  if (ethState.hasOwnProperty("web3")) {
    var web3 = ethState.web3;
    return ethState.hasOwnProperty("address") && web3.isAddress(ethState.address) ? new _promise2["default"](function (r, j) {
      web3.eth.getBalance(ethState.address, function (err, b) {
        return err ? j(ERR_CODES.RPC_ERROR) : r(b)
      })
    }).then(function (_balance) {
      return web3.fromWei(_balance)
    }) : _promise2["default"].reject(ERR_CODES.ACCOUNT_LOCKED)
  }
  return _promise2["default"].reject(ERR_CODES.NETWORK_UNCONNECTED)
}

function _txEtherscan(networkId, txHash) {
  return ETHERSCAN[networkId] + "/tx/" + txHash
}

function _contractEtherscan(networkId, address) {
  return ETHERSCAN[networkId] + "/address/" + address
}

function getAuth() {
  return new _promise2["default"](function (resolve, reject) {
    var timestamp = Date.now().toString();
    ethState.web3.personal.sign(ethState.web3.sha3(timestamp), ethState.address, function (err, key) {
      err ? reject(err) : resolve({key: key, timestamp: timestamp, address: ethState.address})
    })
  })
}

Object.defineProperty(exports, "__esModule", {value: !0});
var _promise = require("babel-runtime/core-js/promise"), _promise2 = _interopRequireDefault(_promise);
exports.getAuth = getAuth;
var ethState = {frontEnd: !0, web3Connect: !1}, ERR_CODES = require("./errors"), inited = !1;
exports.Init = initEnv, exports.STATE = ethState, exports.getEthBalance = getEthBalance;
var ETHERSCAN = {1: "https://etherscan.io", 3: "https://ropsten.etherscan.io", 4: "https://rinkeby.etherscan.io/"};
exports.txOnEtherscan = function (txid) {
  return _txEtherscan(ethState.network, txid)
}, exports.contractOnEtherscan = function (address) {
  return _contractEtherscan(ethState.network, address)
}, exports.getBalanceOf = function (address) {
  return new _promise2["default"](function (r, j) {
    ethState.web3.eth.getBalance(address, function (err, balance) {
      err ? j(ERR_CODES.RPC_ERROR) : r(balance)
    })
  })
};
