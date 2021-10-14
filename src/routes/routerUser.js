import HomePage from 'pages/HomePage';
import InfoUserPage from 'pages/UserPage/InfoUserPage';
import React from 'react'
import UserPage from '../pages/UserPage'

const routers = [

    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/thong-tin-khach-hang',
        exact: true,
        main: () => <InfoUserPage />
    },
    {
        path: '/khach-hang',
        exact: false,
        main: (history, match) => <UserPage history={history} match={match} />
    }
]

export default routers;

