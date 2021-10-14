import { CloseSquareTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import { format } from 'date-fns';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as types from '../../../constants/Report/ActionType';
import callApi from '../../../utils/apiCaller';
import Formater from '../../../components/Common/Format'
function PurchasedOneDayPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const date = new Date()
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const showPopDelete = (maLD) => {
        console.log(maLD);
        setDeleteVisible(true)
    };
    const stocks = useSelector(state => state.StockToday)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    })
    useEffect(() => {
        fetchData(pagination);
    }, [])
    const fetchData = async (pagination) => {
        setLoading(true)
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LenhDat/trongngay?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            dispatch({ type: types.STOCK_TODAY, payload: res.data })
            setData(res.data.list)
            setTimeout(() => {
                setLoading(false)
            }, 300);
            res.data.list.forEach((e) => {

                let value = new Date(e.thoiGian)
                const dateString = format(value, 'dd/MM/yyyy kk:mm:ss')
                e.thoiGian = dateString;
                e.loaiGiaoDich = e.loaiGiaoDich ? 'Mua' : 'Bán';

                e.soLuong = Formater(e.soLuong);
                e.gia = Formater(e.gia);
                e.slKhop = Formater(e.slKhop);
                e.giaKhop = Formater(e.giaKhop);
                e.giaTriKhop = Formater(e.giaTriKhop);
            })
            setPagination({ ...pagination, current: res.data.currentPage, total: res.data.totalItem })
        } catch (error) {
            console.log(error);
        }
    };
    const columns = [
        {
            title: 'Mã lệnh',
            dataIndex: 'maLD',
            key: 'maLD',
            width: 150,
            fixed: 'center',
        },
        {
            title: 'Mã CK',
            dataIndex: 'maCP',
            key: 'maCP',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Mua/Bán',
            dataIndex: 'loaiGiaoDich',
            key: 'loaiGiaoDich',
            width: 100,
            fixed: 'center',
        },
        {
            title: 'Từ tài khoản',
            dataIndex: 'stk',
            key: 'stk',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Ngày giao dịch',
            dataIndex: 'thoiGian',
            key: 'thoiGian',
            width: 400,
            fixed: 'center',
        },
        {
            title: 'Thông tin cổ phiếu',
            children: [
                {
                    title: 'Khối lượng',
                    dataIndex: 'soLuong',
                    key: 'soLuong',
                    width: 100,

                },
                {
                    title: 'Giá',
                    dataIndex: 'gia',
                    key: 'gia',
                    width: 100,
                },
                {
                    title: 'Khối lượng khớp',
                    dataIndex: 'slKhop',
                    key: 'slKhop',
                    width: 100,
                }
                ,
                {
                    title: 'Giá khớp',
                    dataIndex: 'giaKhop',
                    key: 'giaKhop',
                    width: 100,
                },
                {
                    title: 'Giá trị khớp',
                    dataIndex: 'giaTriKhop',
                    key: 'giaTriKhop',
                    width: 100,
                }
            ],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 300,
            fixed: 'center',
        },
        {
            title: 'Hủy lệnh',
            dataIndex: 'maTT',
            key: 'maTT',
            width: 100,
            fixed: 'center',
            render: (maTT, maLD) => (
                <>
                    {maTT.trim() === 'CK' ?
                        <Popconfirm
                            title="Bạn có muốn hủy lệnh này không?"
                            // visible={deleteVisible}
                            onConfirm={() => handleOkDelete(maLD.maLD)}
                            // okButtonProps={{ loading: confirmLoading }}
                            onCancel={handleCancel}
                            okText='Xác nhận'
                            cancelText='Hủy bỏ'
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <CloseSquareTwoTone
                                onClick={() => showPopDelete(maLD.maLD)}
                                style={{ fontSize: '1.5rem', cursor: 'pointer', textAlign: 'center' }}
                            />
                        </Popconfirm>

                        : null}
                </>
            ),
        }
    ]

    const handleCancel = () => {
        setDeleteVisible(false);
    };

    const handleOkDelete = async (maLD) => {
        console.log(maLD);
        const res = await callApi(`Lenhdat/${maLD}`, 'PUT')
        console.log(res);
        if (res.data.status === 0) {
            openNotificationSuccess('Thành công', res.data.message, 2)
        }
        else {
            openNotificationError('Thất bại', res.data.message, 2);
        }
        fetchData(pagination);
        setDeleteVisible(false);
    }
    const handleTableChange = (pagination) => {
        setPagination({ ...pagination, current: pagination.current })
        fetchData(pagination);
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default PurchasedOneDayPage
