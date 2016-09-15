'use strict';

function bubbleSort (array) {
  var sorted = false;
  for (var end = array.length; end > 0 && !sorted; end--) { // passes
    sorted = true; // assume until proven incorrect
    for (var j = 0; j < end; j++) { // bubbling
      if (!inOrder(array, j)) {
        swap(array, j);
        sorted = false;
      }
    }
  }
  return array;
}

function bubbleSort2 (array) {
  for (var iteration = 0; iteration < array.length; iteration++) {
    for (var index = 0; index < array.length - iteration - 1; index++) {
      
    }
  }
}

function inOrder (array, index) { // pure function
  if (index === array.length - 1) return true;
  return array[index] < array[index + 1];
}

function swap (array, index) { // side effects
  var oldLeftValue = array[index];
  array[index] = array[index + 1];
  array[index + 1] = oldLeftValue;
}

// In-place algorithms use only a small, constant amount of extra space.
// Bubble sort is an in-place algorithm;
// it has good space complexity at O(1), but bad time complexity O(n^2).
