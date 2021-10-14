import Pagination from 'components/Common/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import * as types from '../../../constants/Admin/ActionType';
import apiCaller from '../../../utils/apiCaller';
import StockItem from './StockItem';
import StockList from './StockList';


export default function ManagementStocks() {
    const listStock = useSelector(state => state.ManagementStock);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        current: 1,
        pageSize: 10,
    });
    const [paging, setPaging] = useState({
        current: 1,
    })

    useEffect(() => {
        FetchListStock()
    }, [filters])

    const FetchListStock = async () => {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `CoPhieu?${paramsString}`;
        const res = await apiCaller(requestUrl, 'GET', null)
        dispatch({ type: types.FETCH_LIST_STOCK, payload: res.data });
        setPaging({ ...paging, current: res.data.currentPage, total: res.data.totalItem })
    }

    const showListStock = () => {
        let result = null
        if (listStock.list) {
            result = listStock.list.map((order, index) => {
                return (
                    <StockItem
                        key={index}
                        stock={order}
                        index={index}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <StockList >{showListStock()}</StockList>
            {paging.total > 0 ? <Pagination
                filters={filters}
                setFilters={setFilters}
                paging={paging}
            /> : null}
        </>
    )
}
