(function(){
  'use strict';

  var TicTacToe = {

    boardCells: document.getElementsByClassName('cell'),
    wins: [7, 56, 448, 73, 146, 292, 273, 84],
    turn: 'X',
    score: {'X': 0, 'O': 0},
    turnCount: 0,
    moves: 0,
    finished: false,

    init: function(){
      var that = this;

      $('.cell').on('click', function(){
        if(!that.finished){
          that.setMove(this);
        }
      });

      $('#new-game').on('click', function(){
        that.resetGame();
      });

    },

    winner: function(score){
      var that = this;

      // Loop through the possible winning scores
      for (var i = 0; i < that.wins.length; i += 1) {
        // Our bitwise comparison
        if ( (that.wins[i] & score) === that.wins[i] ) {
          return true;
        }
      }

      // If the move played isn't a winning play
      return false;
    },

    computerMove: function(){
      var that = this;

      // Switch to computer's mark
      that.turn = 'O';
      that.moves += 1;
      var emptyCells = [];

      // Create an array of empty cells
      for(var i = 0; i < that.boardCells.length; i++){
        if(!that.boardCells[i].innerHTML){
          emptyCells.push(i);
        }
      }

      // Get a random empty cell number
      var random = emptyCells[ Math.floor( Math.random() * emptyCells.length) ];

      // Place the computer's mark in the empty cells
      // Add to the computer's score
      setTimeout(function(){
        that.boardCells[random].innerHTML = that.turn;
        that.boardCells[random].className += ' alt';

        that.score[that.turn] += parseInt( that.boardCells[random].dataset.bit );

        that.scoreCheck();

        // Switch back to user's mark
        that.turn = 'X';

      }, 500);

    },

    humanMove: function(position){
      var that = this;

      that.moves += 1;

      // User Move (default is 'X')
      $(position).text(that.turn);

      // Add to the humman's score
      that.score[that.turn] += parseInt( $(position).data('bit') );

      that.scoreCheck();
    },

    scoreCheck: function(){
      var that = this;

      // Check if the current score is a winning score
      if ( that.winner(that.score[that.turn]) ) {
        that.finished = true;
        $('#notice').text(that.turn + ' wins!');
      } else if (that.moves === 9) {
        that.finished  = true;
        $('#notice').text('Tie game!');
      } else {
        return;
      }
    },

    setMove: function(position){
      var that = this;

      // Alert user if space is already taken
      if( $(position).text() ){
        alert('Cell already taken!');
        return;
      } else {

        // Human
        that.humanMove(position);

        // AI
        if(!that.finished){
          that.computerMove();
        }

      }
    },

    resetGame: function() {
      var that = this;

      // Reset the vars
      that.turn = 'X';
      that.score = {'X': 0, 'O': 0};
      that.moves = 0;

      // Clear the board
      for (var i = 0; i < that.boardCells.length; i++) {
        that.boardCells[i].innerHTML = '';
        that.boardCells[i].className = 'cell';
      }

      // Clear the notice text
      $('#notice').text('');
      that.finished = false;
    },

  };

  $(document).ready(function(){
    TicTacToe.init();
  });

}());
