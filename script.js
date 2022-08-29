"use strict";

const swapScreens = (() =>{

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

const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    const allBoardSquares = document.querySelectorAll('[data-square]');

    const restartBtn = document.querySelector('[data-restart]');

    restartBtn.addEventListener('click', () => {
        allBoardSquares.forEach(
            square => square.textContent = ''
        )
    })

})();