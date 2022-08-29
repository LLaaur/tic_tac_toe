"use strict";

const swapScreens = (() =>{

    const playBtn = document.querySelector('[data-play]');
    const homePage = document.querySelector('[data-home]');
    const loadPage = document.querySelector('[data-load]');
    const gameScreen = document.querySelector('[data-game]');


    function showGameScreen(){
        loadPage.style.display = 'none';
        gameScreen.style.display = 'grid';  
    };

    playBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadPage.style.display = 'grid';
        setTimeout(showGameScreen, 3500)
    })

})();