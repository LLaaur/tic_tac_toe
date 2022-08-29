const loadingScreenDisplay = (() =>{
    const playBtn = document.querySelector('[data-play]');
    const homePage = document.querySelector('[data-home]');
    const loadPage = document.querySelector('[data-load]')
    playBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadPage.style.display = 'grid';
    });
})();