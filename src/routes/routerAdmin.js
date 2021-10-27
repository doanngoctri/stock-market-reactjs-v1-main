import React from 'react';
import RegisterForm from '../components/Admin/ManagementRegisterForm';
import Stocks from '../components/Admin/ManagementStocks';
import Users from '../components/Admin/ManagementUsers';
import Backup from '../pages/AdminPage/ManageBackupPage';
import Exchanges from '../components/Admin/ManagementExchanges';
import Company from '../components/Admin/ManagementCompany';
const routers = [
    {
        path: '/admin',
        exact: true,
        main: () => <RegisterForm />
    },
    {
        path: '/admin/don-dang-ky',
        exact: true,
        main: () => <RegisterForm />
    },
    {
        path: '/admin/quan-ly-ndt',
        exact: true,
        main: () => <Users />
    },
    {
        path: '/admin/quan-ly-cp',
        exact: true,
        main: () => <Stocks />
    },
    {
        path: '/admin/backup',
        exact: true,
        main: () => <Backup />
    },
    {
        path: '/admin/quy-dinh-san',
        exact: true,
        main: () => <Exchanges />
    },
    {
        path: '/admin/quy-dinh-cong-ty',
        exact: true,
        main: () => <Company />
    }
]

export default routers;

