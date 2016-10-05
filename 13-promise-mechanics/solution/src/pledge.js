'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function isFn (maybeFn) { return typeof maybeFn === 'function'; }

function $Promise () {
  this._state = 'pending';
  this._handlerGroups = [];
  this._updateCbs = [];
}

$Promise.prototype.then = function(successCb, errorCb, updateCb) {
  if (isFn(updateCb) && (this._state === 'pending')) {
    this._updateCbs.push(updateCb);
  }
  var newGroup = {
    successCb: isFn(successCb) ? successCb : null,
    errorCb: isFn(errorCb) ? errorCb : null,
    downstream: new Deferral()
  };
  this._handlerGroups.push(newGroup);
  this._callHandlers();
  return newGroup.downstream.$promise;
};

$Promise.prototype.catch = function(errorCb) {
  return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function() {
  if (this._state === 'pending') return;
  var pA = this,
      handler,
      pBdeferral,
      output;
  this._handlerGroups.forEach(function(group){
    pBdeferral = group.downstream;
    handler = (pA._state === 'resolved') ? group.successCb : group.errorCb;
    if (!handler) {
      // bubbling
      if (pA._state === 'resolved') {
        pBdeferral.resolve(pA._value);
      } else {
        pBdeferral.reject(pA._value);
      }
    } else {
      // invoke the handler and check if it throws an error
      try {
        output = handler(pA._value);
      } catch (errRunningHandler) {
        return pBdeferral.reject(errRunningHandler);
      }
      // deal with the return value of the handler
      if (output instanceof $Promise) {
        pBdeferral.assimilate(output);
      } else {
        pBdeferral.resolve(output);
      }
    }
  });
  this._handlerGroups = [];
};

function Deferral () {
  this.$promise = new $Promise();
}

function settle (_state, value) {
  if (this.$promise._state !== 'pending') return;
  this.$promise._state = _state;
  this.$promise._value = value;
  this.$promise._callHandlers();
  this.$promise._updateCbs = [];
}

Deferral.prototype.resolve = function (data) {
  settle.call(this, 'resolved', data);
};

Deferral.prototype.reject = function (reason) {
  settle.call(this, 'rejected', reason);
};

Deferral.prototype.assimilate = function (promise) {
  promise.then(this.resolve.bind(this), this.reject.bind(this));
};

Deferral.prototype.notify = function (val) {
  if (this.$promise._state !== 'pending') return;
  this.$promise._updateCbs.forEach(function(updateCb){
    updateCb(val);
  });
};

function defer () {
  return new Deferral();
}

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
