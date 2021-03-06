import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as type_status from '../../../constants/Common/ActionType';
import callApi from '../../../utils/apiCaller';
import Formater from '../../../components/Common/Format'

const { Option } = Select;
function HistoryPurchasedPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const status = useSelector(state => state.Status)
    const dispatch = useDispatch()
    const date = new Date()
    const [toDate, setToDate] = useState(new Date());
    function getDateCurrent() {
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var d = today.getDate();
        var m = today.getMonth();
        var y = today.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    function getDateBeforeWeek() {
        var nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        var d = nextweek.getDate();
        var m = nextweek.getMonth();
        var y = nextweek.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    const [pagination, setPagination] = useState({
        from: getDateBeforeWeek(),
        to: getDateCurrent(),
        MaCK: '',
        MaTT: 'TC',
        current: 1,
        pageSize: 10,
    })

    const [page, setPage] = useState({
        pageSize: 10,
        current: 1,
        total: 5,
    })

    useEffect(() => {
        fetchStatus()
    }, [])

    useEffect(() => {
        fetchData(pagination);
    }, [pagination])

    const fetchStatus = async () => {
        setLoading(true)
        try {
            const res = await callApi('TrangThai/lenhdat', 'GET', null)
            dispatch({ type: type_status.FETCH_STATUS, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
    const handleTableChange = (paging) => {
        setTimeout(() => { setPagination({ ...pagination, current: paging.current }) }, 50)
        setTimeout(() => { setPage({ ...page, current: paging.current }) }, 150)
        fetchData(pagination);
    };


    const fetchData = async (pagination) => {
        setLoading(true)
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LichSuLenhDat?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            setTimeout(() => {
                setLoading(false)
            }, 0);
            res.data.list.forEach((e) => {
                let value = new Date(e.thoiGian)
                const dateString = format(value, 'dd/MM/yyyy kk:mm:ss')
                e.thoiGian = dateString;
                e.loaiGiaoDich = e.loaiGiaoDich ? 'Mua' : 'B??n'
                e.soLuong = Formater(e.soLuong);
                e.gia = Formater(e.gia);
                e.slKhop = Formater(e.slKhop);
                e.giaKhop = Formater(e.giaKhop);
                e.giaTriKhop = Formater(e.giaTriKhop);
            })
            setData(res.data.list)
            setPage({ ...page, current: res.data.currentPage, total: res.data.totalItem })

        } catch (error) {
            console.log(error);
        }
    };
    const columns = [
        {
            title: 'M?? l???nh',
            dataIndex: 'maLD',
            key: 'maLD',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'M?? CK',
            dataIndex: 'maCP',
            key: 'maCP',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Mua/B??n',
            dataIndex: 'loaiGiaoDich',
            key: 'loaiGiaoDich',
            width: 100,
            fixed: 'center',
        },
        {
            title: 'T??? t??i kho???n',
            dataIndex: 'stk',
            key: 'stk',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Ng??y giao d???ch',
            dataIndex: 'thoiGian',
            key: 'thoiGian',
            width: 300,
            fixed: 'center',
        },
        {
            title: 'Th??ng tin c??? phi???u',
            children: [
                {
                    title: 'Kh???i l?????ng',
                    dataIndex: 'soLuong',
                    key: 'soLuong',
                    width: 100,

                },
                {
                    title: 'Gi??',
                    dataIndex: 'gia',
                    key: 'gia',
                    width: 100,
                },
                {
                    title: 'Kh???i l?????ng kh???p',
                    dataIndex: 'slKhop',
                    key: 'slKhop',
                    width: 100,
                }
                ,
                {
                    title: 'Gi?? kh???p',
                    dataIndex: 'giaKhop',
                    key: 'giaKhop',
                    width: 100,
                },
                {
                    title: 'Gi?? tr??? kh???p',
                    dataIndex: 'giaTriKhop',
                    key: 'giaTriKhop',
                    width: 100,
                }
            ],
        },
        {
            title: 'Tr???ng th??i',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 300,
            fixed: 'center',
        }
    ]

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'from': fieldsValue['from'].format('MM-DD-YYYY'),
            'to': fieldsValue['to'].format('MM-DD-YYYY'),
        };
        setPagination(
            {
                ...pagination,
                MaTT: values.MaTT,
                MaCK: values.MaCK,
                from: values.from,
                to: values.to,
                current: 1
            }
        )
        setPage({ ...page, current: 1 })
    };

    const worker = {
        from: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)),
        to: moment(new Date()),
        MaTT: 'TC',
        MaCK: ''
    };
    const dateFormat = "DD/MM/YYYY";

    const getListStatus = status.map((sta, index) => {
        return (
            <Option value={sta.maTt}>{sta.tenTrangThai}</Option>
        )
    })
    function disabledFromDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() > toDate;
    }
    function disabledToDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() > Date.now();
    }

    function handleDateChange(e) {
        console.log(e);
    }

    return (
        <>
            <Row>
                <Col span={24}>
                    <Form onFinish={onFinish} initialValues={worker} >
                        <Row gutter={40}>
                            <Col span={5}>
                                <Form.Item name="from" label="T??? ng??y"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng ch???n ng??y',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Ch???n ng??y' format={dateFormat} disabledDate={disabledFromDate} onChange={handleDateChange} />
                                    {/* <RangePicker /> */}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="to" label="?????n ng??y"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng ch???n ng??y',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Ch???n ng??y' format={dateFormat} disabledDate={disabledToDate} onChange={(date) => setToDate(date)} />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="MaTT"
                                    label="Tr???ng th??i"
                                    hasFeedback
                                    rules={[
                                        {
                                            message: 'Ch???n tr???ng th??i!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Tr???ng th??i">
                                        {getListStatus}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    name='MaCK'
                                    label='MaCK'
                                >
                                    <Input placeholder="MACK" style={{ textTransform: 'uppercase' }} />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Form.Item
                                    wrapperCol={{
                                        xs: {
                                            span: 24,
                                            offset: 0,
                                        },
                                        sm: {
                                            span: 16,
                                            offset: 8,
                                        },
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        C???p nh???t
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
            <Table
                columns={columns}
                dataSource={data}
                pagination={page}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default HistoryPurchasedPage
