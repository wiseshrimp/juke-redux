'use strict';

function HashTable (size) {
  this.buckets = new Array(size || 35);
  this.numBuckets = this.buckets.length;
}

function HashNode (key, value) {
    this.key = key;
    this.value = value;
}

HashNode.prototype.valueOf = function() {
    return this.key;
};

HashTable.prototype.set = function(key, value) {
    if (typeof key !== 'string') {
        throw new TypeError('Keys must be strings');
    }
    
    var index = this.hash(key);
    if (!this.buckets[index]) {
        this.buckets[index] = new LinkedList();
    }
    this.buckets[index].addToHead(new HashNode(key, value));
};

HashTable.prototype.get = function(key) {
    var index = this.hash(key);
    return this.buckets[index].search(key).value;
};

HashTable.prototype.hasKey = function(key) {
    var index = this.hash(key);
    return Boolean(this.buckets[index].search(key));
};

HashTable.prototype.hash = function(key) {
    var sum = 0;
    for (var i = 0; i < key.length; i++) {
        sum += key.charCodeAt(i);
    }
    return sum % this.numBuckets;
};