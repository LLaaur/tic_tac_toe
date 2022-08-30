"use strict";

const createPlayer = (player, mark) => {
    return{player, mark};
}

const SwapScreens = (() =>{

    const loadPage = document.querySelector('[data-load]');
    const gameScreen = document.querySelector('[data-game]');

    function showGameScreen(){
        loadPage.style.display = 'none';
        gameScreen.style.display = 'grid';
    };

    const turn = document.querySelector('[data-turn]');
    
    if (gameScreen){
        turn.textContent = 'Player\'s X turn'
    }

    const playBtn = document.querySelector('[data-play]');
    const homePage = document.querySelector('[data-home]');

    playBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadPage.style.display = 'grid';
        setTimeout(showGameScreen, 3500)
    })


})();


const GameBoard = (() => {
    
    let board = ['', '', '', '', '', '', '', '', ''];

    const allBoardSquares = document.querySelectorAll('[data-square]');

    const restartBtn = document.querySelector('[data-restart]');

    restartBtn.addEventListener('click', () => {
        allBoardSquares.forEach(
            square => square.textContent = ''
        );
    });

    allBoardSquares.forEach( (square, index) => {
        square.addEventListener('click', () => {
            square.textContent = gameFlow.Player1.mark;
        })
    })
    
    return{
        board
    }

})();

const gameFlow = ( () => {
    
    const Player1 = createPlayer('Player 1', 'X');
    const Player2 = createPlayer('Player 2', '0');


    let winnerStatus = document.querySelector('[data-status]');

    const winningIndexes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return{
      Player1,
      Player2
    };

})();