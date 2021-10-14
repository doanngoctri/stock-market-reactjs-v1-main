import React from 'react';
import RegisterForm from '../components/Admin/ManagementRegisterForm';
import Stocks from '../components/Admin/ManagementStocks';
import Users from '../components/Admin/ManagementUsers';
import Backup from '../pages/AdminPage/ManageBackupPage';

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
    }
]

export default routers;

