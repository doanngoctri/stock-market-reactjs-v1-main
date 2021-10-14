const showMenuLanguage = () => {
    let menuLanguages = document.querySelector('.header__right-language-list');
    let menuThemes = document.querySelector('.header__right-theme-list');
    let menuAccounts = document.querySelector('.header__right-account-list');
    if(menuAccounts){
        menuAccounts.style.display = 'none';
    }
    if(menuThemes){
        menuThemes.style.display = 'none';
    }
    if (menuLanguages.style.display === 'block') {
        menuLanguages.style.display = 'none';
    }
    else{
        menuLanguages.style.display = 'block';
    }
}