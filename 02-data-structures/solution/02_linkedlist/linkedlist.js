'use strict';

function Node(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.addToTail = function(value) {
  var newTail = new Node(value);
  var formerTail = this.tail;

  if (formerTail) {
    newTail.prev = formerTail;
    formerTail.next = newTail;
    this.tail = newTail;
  } else {
    this.head = this.tail = newTail;
  }
};

LinkedList.prototype.removeTail = function() {
  if (!this.tail) { return; }

  var formerTail = this.tail;
  var newTail = this.tail.prev;

  if (newTail) {
    newTail.next = null;
    this.tail = newTail;

  } else {
    this.head = this.tail = null;
  }

  return formerTail.value;
};

// head methods are exact reverses of tail methods

LinkedList.prototype.addToHead = function(value) {
  var newHead = new Node(value);    // create the new head
  var formerHead = this.head;       // create a formerHead variable

  if (formerHead) {                   // if there was a formerHead
    newHead.next = formerHead;        
    formerHead.prev = newHead;
    this.head = newHead;              // update head variable
  } else {                          // if there wasn't a formerHead, set head and tail
    this.head = this.tail = newHead;
  }
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) { return; }

  var formerHead = this.head;
  var newHead = this.head.next;

  if (newHead) {
    newHead.prev = null;
    this.head = newHead;

  } else {
    this.head = this.tail = null;
  }

  return formerHead.value;
};

LinkedList.prototype.search = function(valueOrFn) {
  var current = this.head;
  var compareFn = makeCompareFn(valueOrFn);

  while (current) {
    if (compareFn(current.value.valueOf())) {
      return current.value;
    }

    current = current.next;
  }

  return null;
}

function makeCompareFn(valueOrFn) {
  if (typeof valueOrFn === 'function') {
    return valueOrFn;
  } else {
    return function(val) {
      return val === valueOrFn;
    }
  }
}
