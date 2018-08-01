function Contract(instance) {
  this.instance = instance
  this.init()
}

function _paserOutput(raw, type) {
  if (type === 'address') {
    return raw.toString()
  } else {
    return raw
  }
}

Contract.prototype.init = function() {
  const self = this
  self.instance.abi.forEach(function(signature) {
    self[signature.name] = function() {
      var argsABI = signature.inputs
      var outputsABI = signature.outputs

      let _callback
      if (typeof arguments[arguments.length - 1] === 'function') {
        _callback = Array.prototype.pop.call(arguments)
      }

      if (arguments.length < argsABI.length) {
        var msg = `${signature.name} needs ${argsABI.length} parameters and 1 callback at least`
        if (_callback) {
          return _callback(msg)
        } else {
          return Promise.reject(msg)
        }
      }

      var options = null
      if (arguments.length === argsABI.length + 1) {
        options = Array.prototype.pop.call(arguments)
      }

      var args = []
      for (var i = 0; i < argsABI.length; i++) {
        args.push(arguments[i])
      }

      if (options != null) {
        args.push(options)
      }

      const retP = {}
      const retPromise = new Promise((resolve, reject) => {
        retP.resolve = resolve
        retP.reject = reject
      })

      let callback
      if (!_callback) {
        callback = function(err, results) {
          if (err) {
            retP.reject(err)
          } else if (signature.constant) {
            if (outputsABI.length === 1) {
              retP.resolve(_paserOutput(results, outputsABI[0].type))
            } else {
              var ret = []
              for (var i = 0; i < outputsABI.length; i++) {
                ret.push(_paserOutput(results[i], outputsABI[i].type))
              }
              retP.resolve(ret)
            }
          } else {
            retP.resolve(results)
          }
        }
      } else {
        callback = function(err, results) {
          if (err) {
            return _callback(err)
          } else if (signature.constant) {
            if (outputsABI.length === 1) {
              return _callback(null, _paserOutput(results, outputsABI[0].type))
            } else {
              var ret = []
              for (var i = 0; i < outputsABI.length; i++) {
                ret.push(_paserOutput(results[i], outputsABI[i].type))
              }
              return _callback(null, ret)
            }
          } else {
            return _callback(null, results)
          }
        }
      }
      args.push(callback)

      self.instance[signature.name].apply(self.instance, args)
      return retPromise
    }

    self[`gasOf_${signature.name}`] = function() {
      var argsABI = signature.inputs

      let _callback
      if (typeof arguments[arguments.length - 1] === 'function') {
        _callback = Array.prototype.pop.call(arguments)
      }

      if (arguments.length < argsABI.length) {
        var msg = `${signature.name} needs ${argsABI.length} parameters at least`
        if (_callback) {
          return _callback(msg)
        } else {
          return Promise.reject(msg)
        }
      }

      var options = {}
      if (arguments.length === argsABI.length + 1) {
        options = Array.prototype.pop.call(arguments)
      }

      const retP = {}
      const retPromise = new Promise((resolve, reject) => {
        retP.resolve = resolve
        retP.reject = reject
      })

      let callback
      if (!_callback) {
        callback = function(err, gas) {
          if (err) {
            retP.reject(err)
          } else {
            retP.resolve(gas)
          }
        }
      } else {
        callback = function(err, gas) {
          if (err) {
            return _callback(err)
          } else {
            return _callback(null, gas)
          }
        }
      }

      const to = self.instance.address
      const data = self.instance[signature.name].getData.apply(self.instance, arguments)

      const tx = Object.assign(options, { data, to })
      self.instance._eth.estimateGas(
        tx,
        callback
      )
      return retPromise
    }

    self[`dataOf_${signature.name}`] = function() {
      var argsABI = signature.inputs

      let _callback
      if (typeof arguments[arguments.length - 1] === 'function') {
        _callback = Array.prototype.pop.call(arguments)
      }

      if (arguments.length < argsABI.length) {
        var msg = `${signature.name} needs ${argsABI.length} parameters at least`
        if (_callback) {
          return _callback(msg)
        } else {
          return Promise.reject(msg)
        }
      }

      if (arguments.length === argsABI.length + 1) {
        Array.prototype.pop.call(arguments)
      }

      const retP = {}
      const retPromise = new Promise((resolve, reject) => {
        retP.resolve = resolve
        retP.reject = reject
      })

      let callback
      if (!_callback) {
        callback = function(err, gas) {
          if (err) {
            retP.reject(err)
          } else {
            retP.resolve(gas)
          }
        }
      } else {
        callback = function(err, gas) {
          if (err) {
            return _callback(err)
          } else {
            return _callback(null, gas)
          }
        }
      }

      const data = self.instance[signature.name].getData.apply(self.instance, arguments)
      callback(null, data)
      return retPromise
    }
  })
}

module.exports = Contract
