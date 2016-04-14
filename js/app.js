(function(){
  'use strict';

  $(document).ready(function(){

    // Set our variables
    var boardCells = document.getElementsByClassName('cell'),
        wins = [7, 56, 448, 73, 146, 292, 273, 84],
        turn = 'X',
        score = {'X': 0, 'O': 0},
        turnCount = 0,
        moves = 0,
        finished = false;

    function winner(score) {
      // Loop through the possible winning scores
      for (var i = 0; i < wins.length; i += 1) {
        // Our bitwise comparison
        if ((wins[i] & score) === wins[i]) {
          return true;
        }
      }

      // If the move played isn't a winning play
      return false;
    }

    function computerMove(){
      // Switch to computer's mark
      turn = 'O';
      moves += 1;
      var emptyCells = [];

      // Create an array of empty cells
      for(var i = 0; i < boardCells.length; i++){
        if(!boardCells[i].innerHTML){
          emptyCells.push(i);
        }
      }

      // Get a random empty cell number
      var random = emptyCells[ Math.floor( Math.random() * emptyCells.length) ];

      // Place the computer's mark in the empty cells
      boardCells[random].innerHTML = turn;

      // Add to the computer's score
      score[turn] += parseInt( boardCells[random].dataset.bit );

      scoreCheck();

      // Switch back to user's mark
      turn = 'X';
    }

    function humanMove(position){
      moves += 1;

      // User Move (default is 'X')
      $(position).text(turn);

      // Add to the humman's score
      score[turn] += parseInt( $(position).data('bit') );

      scoreCheck();
    }

    function scoreCheck(){
      // Check if the current score is a winning score
      if ( winner(score[turn]) ) {
        finished = true;
        $('#notice').text(turn + ' wins!');
      } else if (moves === 9) {
        finished  = true;
        $('#notice').text('Cat\u2019s game!');
      } else {
        return;
      }
    }

    function setMove(position){
      // Alert user if space is already taken
      if( $(position).text() ){
        alert('Cell already taken!');
        return;
      } else {

        // Human
        humanMove(position);

        // AI
        if(!finished){
          computerMove();
        }

      }
    }

    function resetGame() {
      // Reset the vars
      turn = 'X';
      score = {'X': 0, 'O': 0};
      moves = 0;

      // Clear the board
      for (var i = 0; i < boardCells.length; i++) {
        boardCells[i].innerHTML = '';
      }

      // Clear the notice text
      $('#notice').text('');
      finished = false;
    }

    $('.cell').click(function(){
      if(!finished){
        setMove(this);
      }
    });

    $('#new-game').click(function(){
      resetGame();
    });

  });

}());
