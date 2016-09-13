'use strict'

var inquirer = require('inquirer')

var game = require('../example/example.game')

function play(node) {

  // Base case
  if (!node.connections.length) {
    console.log(node.text)
    return Promise.resolve() // Don't worry about this, we will look more into Promise later on
  }

  // Recursive case
  return inquirer.prompt([{

    type : 'list',
    name : 'node',
    message : node.text,
    choices: node.connections
  }])
  .then(function (answer) {
    // What is in the answer we are returned that we can use? Try logging it out!
    // How can we use this value to continue the game? Write your code below
  var myNode = game.getNode(answer.node);
  return play(myNode)
  })
}

play(game.startingPoint)
.then(function () {
  console.log('Game over.') // This will run after the Promise.resolve() method is called
})
