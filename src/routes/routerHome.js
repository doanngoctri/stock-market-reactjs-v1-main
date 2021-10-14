import React from 'react'
// import PropTypes from 'prop-types'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

const routers = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage />
    },

    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage />
    }
    // ,
    // {
    //     path: '/logout',
    //     exact: false,
    //     main: () => <Logout />
    // }
    

]

export default routers;

