// ceil,tc,floor,lower,higher
const colors = ['rgb(255, 37, 255)', 'rgb(255, 217, 0)',
    'rgb(30, 238, 238)', 'rgb(255, 0, 23)', 'rgb(11, 223, 57)']



function changeColor(numStock, tc, floor, ceil) {
    if (parseFloat(numStock) === parseFloat(ceil))
        return colors[0];
    else if (parseFloat(numStock) === parseFloat(tc))
        return colors[1];
    else if (parseFloat(numStock) === parseFloat(floor))
        return colors[2];
    else if (parseFloat(numStock) < parseFloat(tc))
        return colors[3];
    else if (parseFloat(numStock) > parseFloat(tc))
        return colors[4];
}


let stocks = document.querySelectorAll('.stock');


for (let i = 0; i < stocks.length; i++) {
    let line_stock = stocks[i].getElementsByTagName('td');
    let j = 0;
    for (; j < line_stock.length; j++) {
        let numStock = line_stock[j].innerHTML;
        let tc = line_stock[3].innerHTML;
        let ceil = line_stock[2].innerHTML;
        let floor = line_stock[1].innerHTML;
        if (j === 4 || j === 6 || j === 8 || j === 10 || j === 12 || j === 14 || j === 16) {
            let strColor = changeColor(numStock, tc, floor, ceil);
            line_stock[j].style.color = strColor;
            line_stock[j + 1].style.color = strColor;
            if (j === 10) line_stock[0].style.color = strColor;
        }
    }
}


let showMenuTheme = () => {
    let menuThemes = document.querySelector('.header__right-theme-list');
    let menuAccounts = document.querySelector('.header__right-account-list');
    let menuLanguages = document.querySelector('.header__right-language-list');
    if(menuLanguages){
        menuLanguages.style.display = 'none';
    }
    if(menuAccounts){
        menuAccounts.style.display = 'none';
    }
    if (menuThemes.style.display === 'block') {
        menuThemes.style.display = 'none';
    }
    else {
        menuThemes.style.display = 'block';
    }
}

let showMenuAccount = () => {
    let menuAccounts = document.querySelector('.header__right-account-list');
    let menuLanguages = document.querySelector('.header__right-language-list');
    let menuThemes = document.querySelector('.header__right-theme-list');
    if(menuLanguages){
        menuLanguages.style.display = 'none';
    }
    if(menuThemes){
        menuThemes.style.display = 'none';
    }
    if (menuAccounts.style.display === 'block') {
        menuAccounts.style.display = 'none';
    }
    else {
        menuAccounts.style.display = 'block';
    }
}

// modal order matching

let showModalMatching = () => {
    let my_modal = document.getElementById('my-modal');
    console.log(my_modal)
    my_modal.style.visibility = 'visible';
    my_modal.style.opacity = 1;
}

let closeForm = () => {
    let my_modal = document.getElementById('my-modal');
    console.log(my_modal)
    my_modal.style.visibility = 'hidden';
    my_modal.style.opacity = 0;
}

let confirmForm = () => {
    let my_modal = document.getElementById('confirm-modal');
    console.log(my_modal)
    my_modal.style.visibility = 'visible';
    my_modal.style.opacity = 1;
}

let closeFormConfirm = () => {
    let my_modal = document.getElementById('confirm-modal');
    console.log(my_modal)
    my_modal.style.visibility = 'hidden';
    my_modal.style.opacity = 0;
}

// Tab pill

function openCity(evt, floor) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("table-light__content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("content__tab-pill");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("content__tab-pill--active", "");
    }
    document.getElementById(floor).style.display = "inline-table";
    evt.currentTarget.className += " content__tab-pill--active";
  }