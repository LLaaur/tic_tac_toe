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
        turnInfo,
        loadPage,
        gameScreen,
        showGameScreen
    }

})();

let match = 0;

const GameBoard = (() => {
    
    let board = ['', '', '', '', '', '', '', '', ''];

    const gameSquares = document.querySelector('[data-board]');

    const allBoardSquares = document.querySelectorAll('[data-square]');

    const restartBtn  = document.querySelector('[data-restart]');

    const resetTable = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        };
    };

    restartBtn.addEventListener('click', () => {
        resetTable();
        allBoardSquares.forEach(square => square.replaceChildren());
        allBoardSquares.forEach(square => square.style.pointerEvents = 'auto');
        SwapScreens.turnInfo.textContent = 'X turn';
        match = 0;
    });

    const setSquares = (index, mark) => {
        if (index > board.length) {
            return;
        };
        board[index] = mark;
    }

    const getSquares = (index) => {
        if (index > board.length){
            return;
        };
        return board[index];
    }


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
        board,
        getSquares,
        populateSquares,
        setSquares,
        allBoardSquares
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