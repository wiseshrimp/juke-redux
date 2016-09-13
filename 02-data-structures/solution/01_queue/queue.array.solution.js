'use strict';

// using an array to implement

function Queue () {
  this.data = [];
  this.head = this.tail = 0;
}

Queue.prototype.enqueue = function(element) {
 this.data[this.tail] = element;
 this.tail++;
};

Queue.prototype.dequeue = function() {
  if (!this.size()) { return; }

  var value = this.data[this.head];
  this.head++;

  // chops off the front of the list if head index gets larger enough
  if (this.head > 99) {
    this.data = this.data.slice(this.head);
    this.tail = this.tail - this.head;
    this.head = 0;
  }

  return value;
};

Queue.prototype.size = function() {
  return this.tail - this.head;
};
