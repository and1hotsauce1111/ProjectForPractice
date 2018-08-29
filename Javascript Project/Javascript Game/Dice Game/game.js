
var currentPlayer = 1;

var player1TotalScore = 0;

var player2TotalScore = 0;

var counter = 0;

var playtime1 = 0;

var playtime2 = 0;

var isPlayingGame = true;

// hide the elements

document.querySelector('.dice').style = 'display:none';

document.querySelector('.winner1').style = 'display:none';

document.querySelector('.winner2').style = 'display:none';

// roll the dice

document.querySelector('.roll').addEventListener('click', function() {
    
    if(isPlayingGame) {
        
        var dice = Math.floor(Math.random() * 6) + 1;
    
        document.querySelector('.dice').style = 'display:block';
        document.querySelector('.dice').src = 'dice' + dice + '.png';

        if(currentPlayer === 1) {

            document.getElementById('player'+ currentPlayer +'-current-score').textContent = dice;

            player1TotalScore += dice;

            document.getElementById('player'+ currentPlayer +'-total-score').innerHTML = player1TotalScore;

            document.querySelector('.panel-'+ currentPlayer).classList.remove('active'); // change player

            currentPlayer = 2; // switch to player2

            document.querySelector('.panel-'+ currentPlayer).classList.add('active');
            
            document.getElementById('player'+ currentPlayer +'-current-score').textContent = 0;
            
            playtime1 ++;
            
            document.querySelector('#player1-count').textContent = '次數： ' + playtime1;
            
        } else {

            document.getElementById('player'+ currentPlayer +'-current-score').textContent = dice;

            player2TotalScore += dice;

            document.getElementById('player'+ currentPlayer +'-total-score').innerHTML = player2TotalScore;

            document.querySelector('.panel-'+ currentPlayer).classList.remove('active');

            currentPlayer = 1; // switch to player1

            document.querySelector('.panel-'+ currentPlayer).classList.add('active');
            
            document.getElementById('player'+ currentPlayer +'-current-score').textContent = 0;
            
            playtime2 ++;
            
            document.querySelector('#player2-count').textContent = '次數： ' + playtime2;
                 
        }
        
        counter ++;
        

        if (counter === 6) {

            if(player1TotalScore > player2TotalScore){

                document.querySelector('.winner1').style = 'display:block';
                document.querySelector('#player1-current-score').style = 'margin-top:0';
                isPlayingGame = false;
                document.querySelector('.roll').style = 'color: #ccc';
                playtime1 = 0;
                playtime2 = 0;
                

            } else if(player1TotalScore < player2TotalScore) { 

                document.querySelector('.winner2').style = 'display:block';
                document.querySelector('#player2-current-score').style = 'margin-top:0';
                isPlayingGame = false;
                document.querySelector('.roll').style = 'color: #ccc';
                playtime1 = 0;
                playtime2 = 0;

            } else {

                document.querySelector('.roll').textContent = '平手！';
                isPlayingGame = false;
                document.querySelector('.roll').style = 'color: #ccc';
                playtime1 = 0;
                playtime2 = 0;
                
            }

        }   
        
    } else {
        
        // init game

        isPlayingGame = false;

    }
  
});


function init() {
    
    currentPlayer = 1;

    player1TotalScore = 0;

    player2TotalScore = 0;

    counter = 0;
    
    playtime1 = 0;
    
    playtime2 = 0;

    document.querySelector('.dice').style = 'display:none';

    document.querySelector('.winner1').style = 'display:none';

    document.querySelector('.winner2').style = 'display:none';

    document.querySelector('#player1-current-score').textContent = 0;

    document.querySelector('#player2-current-score').textContent = 0;

    document.querySelector('#player1-total-score').textContent = 0;

    document.querySelector('#player2-total-score').textContent = 0;

    document.querySelector('.panel-1').classList.add('active');

    document.querySelector('.panel-2').classList.remove('active');

    document.querySelector('.roll').textContent = '搖骰子！';

    document.querySelector('#player1-current-score').style = 'margin-top:55px';

    document.querySelector('#player2-current-score').style = 'margin-top:55px';
    
    document.querySelector('.roll').style = 'color: #555';
    
    document.querySelector('#player1-count').textContent = '次數： 0';
    
    document.querySelector('#player2-count').textContent = '次數： 0';
        
}

document.querySelector('.newGame').addEventListener('click', function() {
    
    init();
    isPlayingGame = true;
});