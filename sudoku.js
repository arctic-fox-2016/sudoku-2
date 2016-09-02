"use strict"
//var term = require( 'terminal-kit' ).terminal ;
//term.red( 'Hello world!' )

class Sudoku {
  constructor(board_string){
    this._board = [];
    this._values = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this._finished = false;
    this.create(board_string);
  }

  create(string){
    var string_idx = 0;
    for(var x = 0; x < 9; x++){
      this._board[x] = [];
      for(var y = 0; y < 9; y++){
        this._board[x][y] = string[string_idx];
        string_idx++;
      }
    }
  }

  isExist(value = null, array = []){
    for(var idx = 0; idx < array.length; idx++){
      if(value == array[idx]) return true;
    }
    return false;
  }

  isInRow(value, nx, ny){
    var array = [];
    for(var y = 0; y < 9; y++){
      var board_value = this._board[nx][y];
      if(board_value != "0"){
        array[array.length] = this._board[nx][y];
      }
    }
    if(this.isExist(value, array)){
      return true;
    }
    return false;
  }

  isInCol(value, nx, ny){
    var array = [];
    for(var x = 0; x < 9; x++){
      var board_value = this._board[x][ny];
      if(board_value != "0"){
        array[array.length] = this._board[x][ny];
      }
    }
    if(this.isExist(value, array)){
      return true;
    }
    return false;
  }

  isInBox(value, nx, ny){
    var array = [];
    nx -= Math.floor(nx % 3);
    ny -= Math.floor(ny % 3);

    var x_max = nx + 3, y_max = ny + 3;
    for(var x = nx; x < x_max; x++){
      for(var y = ny; y < y_max; y++){
        var board_value = this._board[x][y];
        if(board_value != "0"){
          array[array.length] = this._board[x][y];
        }
      }
    }
    if(this.isExist(value, array)){
      return true;
    }
    return false;
  }

  solve(nx = 0, ny = 0) {
    var grid = this._board[nx][ny];

    // Code Back track here
    if(grid == "0"){
      var index = 0;
      for(var idx = 0; idx < this._values.length; idx++){
        var temp_value = this._values[idx];
        var isBox = true, isRow = true, isCol = true;
        isBox = this.isInBox(temp_value, nx, ny);
        isRow = this.isInRow(temp_value, nx, ny);
        isCol = this.isInCol(temp_value, nx, ny);
        if(!isBox && !isRow && !isCol){
          this._board[nx][ny] = temp_value;
        } else {
          if(index < this._values.length-1) index += 1;
        }
      }
    }
    // Code Back track here

    if (nx < 8){
      this.solve(nx + 1, ny);
    } else if(nx == 8){
      nx = 0;
      if(ny < 8){
        this.solve(nx, ny + 1);
      } else if(ny == 8){
        if(!this._finished){
          this.print_board();
          this._finished = true;
        } else return true;
      }
    }
  }

  // Returns a string representing the current state of the board

  print_board() {
    var string_idx = 0;
    console.log("---------------------");
    for(var x = 0; x < 9; x++){
      var temp_row = "";
      for(var y = 0; y < 9; y++){
        if(y % 3 == 0 && y != 0) temp_row += "| ";
        if(this._board[x][y] == 0) temp_row += "_ ";
        else temp_row += this._board[x][y] + " ";
      }
      console.log(temp_row);
      if((x+1) % 3 == 0 && x != 0) console.log("---------------------");
    }
  }
}

// The file has newlines at the end of each line, so we call split to remove it (\n)
/*
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
*/

var board_string = "003020600900305001001806400008102900700000008006708200002609500800203009005010300";
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log("**** Sudoku 1 ****")
game.print_board()
console.log("\n\n\n")
console.log("**** Sudoku 2 ****")
game.solve()
