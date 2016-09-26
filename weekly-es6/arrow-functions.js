// ES6 of the week: arrow functions and lexical scope

// https://github.com/lukehoban/es6features

// arrow functions are a shorthand for function syntax,
// which make them a lot more succint for functions that take functions
// (i.e. 'higher order functions')

var evens = [2,4,6,8,10];

// traditional function
var odds = evens.map(function(val) {
  return val + 1;
});

// 'expression body' syntax, automaticall returns
var odds3 = evens.map(val => val + 1);

// with multiple arguments and 'statement body' syntax
var byIndex = even.map((val, index) => {
  return { index: index, val: val};
});

/* LEXICAL THIS!!! */
var traditional = {
  name: "Ben",
  siblings: ["Lauren", "Ben"],
  printFriends: function () {
    this.siblings.forEach(function(sibling) {
      console.log(this.name, "<3", sibling)
    });
  }
}


