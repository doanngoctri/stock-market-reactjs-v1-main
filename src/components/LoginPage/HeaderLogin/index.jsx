import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogin = () => {
    return (
        <header className="header__login">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__logo-login"><img src="./assets/images/ntnt.png" alt='' /></Link>
                </div>
            </div>
        </header>
    );
}

export default HeaderLogin;
