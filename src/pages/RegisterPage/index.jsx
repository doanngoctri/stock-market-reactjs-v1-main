import React from 'react';
import '../../assets/css/login.css'
import MainRegister from 'components/LoginPage/MainRegister';
import HeaderLogin from 'components/LoginPage/HeaderLogin';
import FooterLogin from 'components/LoginPage/FooterLogin';
const RegisterPage = () => {
    return (
        <div className="login">
            {/* Begin Header */}
            <HeaderLogin />
            {/* Begin main */}
            <MainRegister />
            {/* Begin Footer */}
            {/* <FooterLogin /> */}

        </div>
    );
}

export default RegisterPage;
