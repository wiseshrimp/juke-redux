'use strict'
var Connection = function(nextNode, condition) {
  this.name = condition;
  this.value = nextNode;
}

module.exports = Connection
