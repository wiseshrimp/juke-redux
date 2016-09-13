'use strict'
var Node = require('./node')


var Game = function() {
  this.nodes = {};
  this.startingPoint = null;
}

Game.prototype.addNode = function(title,text) {
  if(title in this.nodes) {
    throw new Error("already defined this node ya dummy")
  }
  var newNode = new Node(title, text);
  this.nodes[title] = newNode;
  this.startingPoint = this.startingPoint || newNode;

  if(!this.startingPoint) {
    this.startingPoint = newNode;
  }
  return newNode;
}

Game.prototype.getNode = function(title) {
  if(title in this.nodes) {
    return this.nodes[title]
  }
}

Game.prototype.connect = function(n1, n2, condition) {
  this.nodes[n1].connect(n2, condition);
}
 
module.exports = Game
