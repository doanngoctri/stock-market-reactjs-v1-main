import Pagination from 'components/Common/Pagination';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../constants/Admin/ActionType';
import { default as apiCaller, default as callApi } from '../../../utils/apiCaller';
import RegisterFormItem from './RegisterFormItem';
import RegisterFormList from './RegisterFormList';


export default function ManagementRegisterForm() {
    const listFormRegister = useSelector(state => state.RegisterForm);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        current: 1,
        pageSize: 10,
    });
    const [paging, setPaging] = useState({
        current: 1,
    })
    useEffect(() => {
        FetchListRegisterForm()
    }, [filters])

    useEffect(() => {
        if (listFormRegister.list!== null && Array.isArray(listFormRegister.list) && listFormRegister.list.length === 0 && paging.current !== 1) {
            let pos = paging.current - 1;
            setFilters({ ...filters, current: pos })
        }
    }, [listFormRegister.list])

    const FetchListRegisterForm = async () => {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `DonDangKy?${paramsString}`;
        const res = await apiCaller(requestUrl, 'GET', null)
        dispatch({ type: types.FETCH_LIST_REGISTER_FORM, payload: res.data });
        setPaging({ ...paging, current: res.data.currentPage, total: res.data.totalItem })
    }
    const handleConfirmChange = async (id) => {
        console.log('put ', id);
        const res = await callApi(`DonDangKy/${id}`, 'PUT')
        console.log(res);
        if (res.data.status === 0) {
            openNotificationSuccess('Thành công', res.data.message, 2)
            FetchListRegisterForm()
        }
        else {
            openNotificationError('Thất bại', res.data.message, 2);
        }
    }
    const handleDeleteChange = async (id) => {
        console.log('delete ', id);
        const res = await callApi(`DonDangKy/${id}`, 'DELETE')
        console.log(res);
        if (res.data.status === 0) {
            openNotificationSuccess('Thành công', res.data.message, 2)
            FetchListRegisterForm()
        }
        else {
            openNotificationError('Thất bại', res.data.message, 2);
        }
    }

    // const handleOnChange = () => {
    //     FetchListRegisterForm()

    // }

    const showListFormRegister = () => {
        let result = null
        if (listFormRegister.list) {
            result = listFormRegister.list.map((order, index) => {
                return (
                    <RegisterFormItem
                        key={index}
                        formRegister={order}
                        index={index}
                        handleConfirmChange={handleConfirmChange}
                        handleDeleteChange={handleDeleteChange}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <RegisterFormList >{showListFormRegister()}</RegisterFormList>
            {paging.total > 0 ? <Pagination
                filters={filters}
                setFilters={setFilters}
                paging={paging}
            /> : null}
        </>
    )
}
