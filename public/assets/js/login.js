showError = (id) => {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let userNotify = document.getElementById('userLogin');
    let PassNotify = document.getElementById('passLogin');
    let icon_error ;
    if (id === 'user') {
        icon_error = document.querySelector('.password + .icon-error');
        if (password.value.length > 0) {
            icon_error.style.visibility = 'hidden';
        }else{
            icon_error.style.visibility = 'visible';

        }
        icon_error = document.querySelector('.username + .icon-error');
        PassNotify.classList.remove('type-error--show');
        if (username.value.length === 0) {
            userNotify.classList.add('type-error--show');
            icon_error.style.visibility = 'visible';
        }
        else {
            PassNotify.classList.remove('type-error--show');
            icon_error.style.visibility = 'hidden';
        }
    } else if (id === 'pass') {
        icon_error = document.querySelector('.username + .icon-error');
        if (username.value.length > 0) {
            icon_error.style.visibility = 'hidden';
        }else{
            icon_error.style.visibility = 'visible';

        }
        icon_error = document.querySelector('.password + .icon-error');
        userNotify.classList.remove('type-error--show');
        if (password.value.length === 0) {
            icon_error.style.visibility = 'visible';
            PassNotify.classList.add('type-error--show');
        }
        else {
            PassNotify.classList.remove('type-error--show');
            icon_error.style.visibility = 'hidden';
        }
    }
}

function changeError(){

}