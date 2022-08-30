"use strict";

const SwapScreens = (() =>{

    const loadPage = document.querySelector('[data-load]');
    const gameScreen = document.querySelector('[data-game]');

    function showGameScreen(){
        loadPage.style.display = 'none';
        gameScreen.style.display = 'grid';
    };

    const turnInfo = document.querySelector('[data-turn]');
    if(gameScreen){
        turnInfo.textContent = 'X turn';
    };

    const playBtn = document.querySelector('[data-play]');
    const homePage = document.querySelector('[data-home]');

    playBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadPage.style.display = 'grid';
        setTimeout(showGameScreen, 3500);
    });

    return{
        turnInfo
    }

})();

let match = 0;

const GameBoard = (() => {
    
    let board = ['', '', '', '', '', '', '', '', ''];

    const allBoardSquares = document.querySelectorAll('[data-square]');

    const restartBtn = document.querySelector('[data-restart]');

    restartBtn.addEventListener('click', () => {
        allBoardSquares.forEach(
            square => square.textContent = '',
            SwapScreens.turnInfo.textContent = 'X turn',
            match = 0,
            populateSquares()
        );
    });

    const getSquares = (index) => {
        if (index > board.length){
            return;
        }
        return board[index];
    }


    const populateSquares = () => {
        allBoardSquares.forEach((square, index) => {
            square.addEventListener('click', () => {
                gameFlow.playMatch();
                if (square.textContent == '') {
                    square.textContent = gameFlow.currentPlayer();
                }
                if (match === 9) {
                    SwapScreens.turnInfo.textContent = 'Tie!';
                    return;
                }
            }, { once: true })
        })
    }
    populateSquares();
    
    return{
        board,
        getSquares,
        populateSquares
    }

})();



const gameFlow = ( () => {

    const createPlayer = (mark) => {
        this.mark = mark;

        const getMark = () => {
            return mark
        };

        return {getMark};
    }
    
    const Player1 = createPlayer('X');
    const Player2 = createPlayer('O');



    const currentPlayer = () => {
        return match % 2 === 1 ? Player1.getMark() : Player2.getMark();
    }

    const playMatch = (squareIndex) => {
        GameBoard.getSquares(squareIndex, currentPlayer());
        SwapScreens.turnInfo.textContent = `${currentPlayer()} turn`
        match++;
    }



    const checkWinner = (squareIndex) => {
        const winIndexes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }
    

    return{
      playMatch,
      currentPlayer,
      checkWinner
    }

    
})();