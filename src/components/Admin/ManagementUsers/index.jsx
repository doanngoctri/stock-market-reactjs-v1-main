import Pagination from 'components/Common/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../constants/Admin/ActionType';
import apiCaller from '../../../utils/apiCaller';
import UserItem from './UserItem';
import UserList from './UserList';
import queryString from 'query-string';


export default function ManagementUsers() {
    const listUser = useSelector(state => state.ManagementUser);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        current: 1,
        pageSize: 10,
    });
    const [paging, setPaging] = useState({
        current: 1,
    })

    useEffect(() => {
        FetchListUser()
    }, [filters])

    const FetchListUser = async () => {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `NhaDauTu?${paramsString}`;
        const res = await apiCaller(requestUrl, 'GET', null)
        dispatch({ type: types.FETCH_LIST_USER, payload: res.data });
        setPaging({ ...paging, current: res.data.currentPage, total: res.data.totalItem })
    }
    console.log(listUser);
    const showListUser = () => {
        let result = null
        if (listUser.list) {
            result = listUser.list.map((order, index) => {
                return (
                    <UserItem
                        key={index}
                        user={order}
                        index={index}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <UserList >{showListUser()}</UserList>
            {paging.total > 0 ? <Pagination
                filters={filters}
                setFilters={setFilters}
                paging={paging}
            /> : null}
        </>
    )
}
