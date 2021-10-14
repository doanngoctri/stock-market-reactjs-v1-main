import { Table } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import callApi from '../../../utils/apiCaller';
import Formater from '../../../components/Common/Format'

function StockPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    })

    useEffect(() => {
        fetchData(pagination);
    }, [])

    const fetchData = async (pagination) => {
        setLoading(true)
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `ChungKhoanHienCo?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            console.log(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 200);
            res.data.list.forEach((e) => {
                e.soLuongT0 = Formater(e.soLuongT0);
                e.soLuongT1 = Formater(e.soLuongT1);
                e.soLuongT2 = Formater(e.soLuongT2);
                e.tongSo = Formater(e.tongSo);
                e.soLuong = Formater(e.soLuong);
                e.giaTriTT = Formater(e.giaTriTT);
                e.giaTT = Formater(e.giaTT);
            })
            setData(res.data.list)
            setPagination({ ...pagination, current: res.data.currentPage, total: res.data.totalItem })
        } catch (error) {
            console.log(error);
        }
    };
    const handleTableChange = (pagination) => {
        setPagination({ ...pagination, current: pagination.current })
        fetchData(pagination);
    };
    const columns = [
        {
            title: 'Mã CK',
            dataIndex: 'maCp',
            key: 'maCp',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tổng số lượng',
            dataIndex: 'tongSo',
            key: 'tongSo',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Khả dụng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Giao dịch chờ cổ phiếu',
            children: [
                {
                    title: 'T0',
                    dataIndex: 'soLuongT0',
                    key: 'soLuongT0',
                    width: 150,

                },
                {
                    title: 'T1',
                    dataIndex: 'soLuongT1',
                    key: 'soLuongT1',
                    width: 150,
                },
                {
                    title: 'T2',
                    dataIndex: 'soLuongT2',
                    key: 'soLuongT2',
                    width: 150,
                }
            ],
        },
        {
            title: 'Giá thị trường',
            dataIndex: 'giaTT',
            key: 'giaTT',
            width: 150,
            fixed: 'center',
        },
        {
            title: 'Giá trị thị trường',
            dataIndex: 'giaTriTT',
            key: 'giaTriTT',
            width: 200,
            fixed: 'center',
        }
    ]
    return (
        <>
            <Table
                dataSource={data}
                pagination={pagination}
                loading={loading}
                columns={columns}
                onChange={handleTableChange}
            />
        </>
    )
}

export default StockPage