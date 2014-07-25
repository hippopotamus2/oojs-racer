$(document).ready(function(){
  var game = function() {
    var player1 = $(document).on('keypress', function(e){
      console.log("hi")
      e.preventDefault();
      var activeTd = $('#player1_strip td.active');
      var lastTd = $('#player1_strip td').last();

      if ( e.which === 97 ){
        $(activeTd).next().addClass('active');
        $(activeTd).removeClass('active');
      }
      if( lastTd.hasClass('active') ){
        gameOver(1);
      }
    });

    var player2 = $(document).keypress(function(e){
      e.preventDefault();
      var activeTd = $('#player2_strip td.active');
      var lastTd = $('#player2_strip td').last();
      if( e.which === 112 ){
        $(activeTd).next().addClass('active');
        $(activeTd).removeClass('active');
      }
      if( lastTd.hasClass('active') ){
        gameOver(2);
      }
    })

    var gameOver = function(playerNumber){
      $(document).off();
      alert("Player "+playerNumber+" has won!");
      var question = confirm("Restart?") ;
      if (question == true){
        restartGame();
      }else{
        $.ajax({
          type: "POST",
          url: '/game',
          // data: "hello",
          success: function(data){
            $('body').html(data)
          },
          fail: function(){
            alert("There was an error. BACK TO THE SANDBOX")
            $.get('/')
          }
        })
      }
    }

    var restartGame = function(){
      $('#player1_strip td.active').removeClass('active');
      $('#player2_strip td.active').removeClass('active');
      $('#player1_strip td:nth-child(2)').addClass('active');
      $('#player2_strip td:nth-child(2)').addClass('active');
      game();
    }
  }

  $('button#start_game').on('click', function(e){
    game();
  })
});
