"use strict";

// module for swapping between the homepage, loading screen and game screen

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

    const playerBtn = document.querySelector('[data-player]');
    const homePage = document.querySelector('[data-home]');

    playerBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadPage.style.display = 'grid';
        setTimeout(showGameScreen, 3500);
    });

    return{
        turnInfo,
        loadPage,
        gameScreen,
        showGameScreen
    }

})();

// global variable to increment each number of turns between players

let match = 0;

const GameBoard = (() => {
    
    let board = ['', '', '', '', '', '', '', '', ''];

    const allBoardSquares = document.querySelectorAll('[data-square]');

    const restartBtn  = document.querySelector('[data-restart]');

    // resetting the indexes of the game board

    const resetTable = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        };
    };

    restartBtn.addEventListener('click', () => {
        resetTable();
        // empty the squares of the board
        allBoardSquares.forEach(square => square.replaceChildren());

        // allow pointer events again
        allBoardSquares.forEach(square => square.style.pointerEvents = 'auto');

        SwapScreens.turnInfo.textContent = 'X turn';
        match = 0;
    });

    // setter function for assigning the index of the square with the sign of the player

    const setSquares = (index, mark) => {
        if (index > board.length) {
            return;
        };
        board[index] = mark;
    }

    // getter function to return the square index from the game board

    const getSquares = (index) => {
        if (index > board.length){
            return;
        };
        return board[index];
    }

    // adding an event listener to each square of the board, checking for winning and tie conditions

    const populateSquares = (() => {
        allBoardSquares.forEach((square, squareIndex) => {
            square.addEventListener('click', (e) => {
                gameFlow.playMatch();

                e.target.style.pointerEvents = 'none';

                if (e.target.textContent == '') {
                    e.target.textContent = gameFlow.currentPlayer()
                };
                
                setSquares(squareIndex, gameFlow.currentPlayer())
                if (gameFlow.checkWinner(squareIndex, gameFlow.currentPlayer(squareIndex))) {
                    SwapScreens.turnInfo.textContent = `${gameFlow.currentPlayer()} won this match!`;
                    allBoardSquares.forEach(square => square.style.pointerEvents = 'none');
                }

                if (match === 9) {
                    SwapScreens.turnInfo.textContent = 'Tie!';
                    return;
                }

            }, );
        });
    })();
    
    
    return{
        getSquares,
        setSquares
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

    // getting the index of the square and assigning them the player sign, swithcing between players

    const playMatch = (squareIndex) => {
        GameBoard.getSquares(squareIndex, currentPlayer());
        SwapScreens.turnInfo.textContent = `${currentPlayer()} turn`
        match++;
    }

    // winning indexes

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
        ];

        return winIndexes
            .filter((combination) => combination.includes(squareIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => GameBoard.getSquares(index) === currentPlayer()
                )
            );

    };

    return{
      playMatch,
      currentPlayer,
      checkWinner,
    }

    
})();