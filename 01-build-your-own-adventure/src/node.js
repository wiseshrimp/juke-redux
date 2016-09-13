'use strict'
var Connection = require('./connection')

var Node = function(title, text) {
  this.title = title;
  this.text = text;
  this.connections = [];
  this.conditions = {};
}

Node.prototype.connect = function(node, prompt) {
  if(prompt in this.conditions) {
    throw new Error("Already defined that connection sucker")
  }
  var newConnect = new Connection(node, prompt);
  this.conditions[prompt] = newConnect;
  this.connections.push(newConnect);
}

module.exports = Node
