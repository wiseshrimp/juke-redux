var utils = {
  //get cell status
  getCellStatus: function(cell){
    return cell.getAttribute('data-status');
  },
  //set cell status
  setCellStatus: function(cell, status) {
    cell.setAttribute('data-status', status)
    cell.className = status;
  },
  //toggle cell
  toggleStatus: function(cell) {
    if(utils.getCellStatus(cell) === 'dead') {
      utils.setCellStatus(cell, 'alive');
    } else {
      utils.setCellStatus(cell, 'dead');
    }
  },
  getCell: function(col,row) {
    return document.getElementById(col + '-' + row);
  },
  //get neighbors
  
  getNeighbors : function(cell) {
 
    var splitId = cell.id.split('-').map(Number);
    var col = splitId[0];
    var row = splitId[1];
    var neighbors = [];

    //get left/right
    neighbors.push(utils.getCell(col-1, row));
    neighbors.push(utils.getCell(col+1, row));
    //get top row
    neighbors.push(utils.getCell(col-1, row-1));
    neighbors.push(utils.getCell(col, row-1));
    neighbors.push(utils.getCell(col+1, row-1));

    //get bottom row
    neighbors.push(utils.getCell(col-1, row+1));
    neighbors.push(utils.getCell(col, row+1));
    neighbors.push(utils.getCell(col + 1, row+1));

    return neighbors.filter(function(neighbor) {
      return neighbor !== null;
    });

  },
  //count neieighbors
  countAlive : function(neighbors) {
    return neighbors.filter(function(neighbor) {
      return utils.getCellStatus(neighbor) === 'alive';
    }).length;
  }
}


var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    var allCells = [].slice.call(document.getElementsByTagName('td'));

    allCells.forEach(function(cell) {
      var splitId = cell.id.split('-');
      iteratorFunc(cell, splitId[0], splitId[1])
    })
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    this.forEachCell(function(cell) {
      cell.addEventListener('click', function(){
        utils.toggleStatus(this);     
      });
    });

    var stepBtn = document.getElementById('step_btn');
    var playBtn = document.getElementById('play_btn');
    var clearBtn = document.getElementById('clear_btn');
    var resetBtn = document.getElementById('reset_btn');

    stepBtn.addEventListener('click', gameOfLife.step.bind(this));
    playBtn.addEventListener('click', gameOfLife.enableAutoPlay.bind(this));
    clearBtn.addEventListener('click', gameOfLife.clear.bind(this));
    resetBtn.addEventListener('click', gameOfLife.reset.bind(this));
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    var toToggle = [];

    //iterate over cells, and toggle status based on # of living neighbors
    this.forEachCell(function(cell) {
      var neighbors = utils.getNeighbors(cell);
      var numAlive = utils.countAlive(neighbors);
      if(utils.getCellStatus(cell) === 'alive') {
        console.log('living', cell, numAlive)
      }
      if(utils.getCellStatus(cell) === 'dead') {
        if(numAlive === 3) {
          toToggle.push(cell)
        }
      //cell is alive
      } else {
        if(numAlive < 2 || numAlive > 3) {
          toToggle.push(cell);
        }
      }
    });

    toToggle.forEach(utils.toggleStatus)
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
   if( this.stepInterval === null) {
    this.stepInterval = setInterval(this.step.bind(this)) 
   } else {
    //stop
    this.stop();
   }
   
  },
  stop : function() {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  },
  clear : function() {
    this.stop();
    this.forEachCell(function(cell){
      utils.setCellStatus(cell, 'dead');
    })
  },
  reset : function() {
    this.stop();
    this.clear();
    this.forEachCell(function(cell){
      if(Math.random() > 0.5) {
        utils.setCellStatus(cell, 'alive')
      } else {
        utils.setCellStatus(cell, 'dead');
      }
    })
  }
};

  gameOfLife.createAndShowBoard();
