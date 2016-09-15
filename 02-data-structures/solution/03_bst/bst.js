'use strict';

function BinarySearchTree (value) {
    this.value = value;
    this.magnitude = 1; // total # of nodes
    this.left = this.right = null;
}

BinarySearchTree.prototype.insert = function(value) {
    this.magnitude++;
    // ternary operator to choose between left and right
    var direction = value < this.value ? 'left' : 'right';
    if (!this[direction]) {
        this[direction] = new BinarySearchTree(value);
    } else {
        this[direction].insert(value);
    }
};

BinarySearchTree.prototype.contains = function(value) {
    if (this.value === value) return true;

    var direction = value < this.value ? 'left' : 'right';
    
    return (this[direction]) ? this[direction].contains(value) : false;
};

BinarySearchTree.prototype.depthFirstForEach = function(fn, order) {
    if (order === 'pre-order') {
        fn(this.value);
        this.left && this.left.depthFirstForEach(fn, order);
        this.right && this.right.depthFirstForEach(fn, order);
    } else if (order === 'post-order') {
        this.left ? this.left.depthFirstForEach(fn, order) : false;
        this.right && this.right.depthFirstForEach(fn, order);
        fn(this.value);
    } else {
        this.left && this.left.depthFirstForEach(fn, order);
        fn(this.value);
        this.right && this.right.depthFirstForEach(fn, order);
    }
};

// BinarySearchTree.prototype.depthFirstForEach = function(fn, order) {
//     if (order === 'pre-order') fn(this.value);
//     if (this.left) this.left.depthFirstForEach(fn, order);
//     if (!order || order === 'in-order') fn(this.value);
//     if (this.right) this.right.depthFirstForEach(fn, order);
//     if (order === 'post-order') fn(this.value);
// };

BinarySearchTree.prototype.breadthFirstForEach = function(fn) {
    var queue = [this];
    var tree;
    while (queue.length) {
        tree = queue.shift();
        fn(tree.value);
        tree.left && queue.push(tree.left);
        tree.right && queue.push(tree.right);
    }
};

BinarySearchTree.prototype.size = function() {
    return magnitude;
    // var size = 0;

    // if (this) { size++ }
    // size += this.left && this.left.size()
    // size += this.right && this.right.size()

    // return size;
};