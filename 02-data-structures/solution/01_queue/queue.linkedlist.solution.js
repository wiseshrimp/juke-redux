'use strict';

function Node(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

function Queue() {
  this.head = null;
  this.tail = null;
}

Queue.prototype.enqueue = function(value) {
  var node = new Node(value);
  if (this.tail) {
    this.tail.next = node;
    this.tail = node;
  }
  else {
    this.head = this.tail = node;
  }
}

Queue.prototype.dequeue = function() {
  if (this.head) {
    var formerHead = this.head;
    this.head = formerHead.next;
    if (this.head === null) {
      this.tail = null;
    }
    return formerHead.value;
  }
  // returns undefined by default
}

Queue.prototype.size = function() {
  var current = this.head;
  var size = 0;

  while (current) {
    size++;
    current = current.next;
  }

  return size;
}
