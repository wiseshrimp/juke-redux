'use strict';
/* global bubbleSort inOrder swap */

function numerically (a, b) { return a - b; }

function generateArray(size, lower, upper) {
  var randomArray = [];
  while (size--) {
    var randomNum = Math.floor(lower + Math.random() * upper);
    randomArray.push(randomNum);
  }
  return randomArray;
}

describe('Bubble Sort', function(){

  it('sorts an empty array', function(){
    expect( bubbleSort([]) ).toEqual( [] );
  });

  it('sorts an array of one element', function(){
    expect( bubbleSort([7]) ).toEqual( [7] );
  });

  // it('sorts an array of many elements', function(){
  //   expect( bubbleSort([5, 2, 7, 9, 3, 5, 4, 1, 0]) ).toEqual([0, 1, 2, 3, 4, 5, 5, 7, 9]);
  // });

  for (var i = 2; i < 103; i += 20) {
    it('sorts an array of ' + i + ' random items', function(){
      var arr = generateArray(i, 0, 100);
      var sorted = arr.slice(0).sort(numerically);
      expect( bubbleSort(arr) ).toEqual( sorted );
    });
  }

  it('compares the expected number of times', function(){
    spyOn(window, 'inOrder').and.callThrough();
    bubbleSort([4, 6, 5, 1]);
    expect(inOrder.calls.count()).toEqual(10);
  });

  it('swaps the expected number of times', function(){
    spyOn(window, 'swap').and.callThrough();
    bubbleSort([4, 6, 5, 1]);
    expect(swap.calls.count()).toEqual(4);
  });

  // function spyOn (obj, method) {
  //   var counter = 0;
  //   var spy = function () {
  //     counter++;
  //   }
  //   obj[method] = spy;
  //   spy.calls = {
  //     count: function() { return counter; }
  //   };
  // }

});
