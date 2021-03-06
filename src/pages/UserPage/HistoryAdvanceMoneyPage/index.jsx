import { Button, Col, DatePicker, Form, Input, Row, Select, Table,Checkbox, InputNumber } from 'antd';
import { format } from 'date-fns';
import { CloseSquareTwoTone, QuestionCircleOutlined, UndoOutlined } from '@ant-design/icons';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import { Popconfirm } from 'antd';
import moment from 'moment-timezone';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as type_status from '../../../constants/Common/ActionType';
import callApi from '../../../utils/apiCaller';
import Formater from '../../../components/Common/Format'
import *as Lable from '../../../constants/Label/Label'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { boolean } from 'yup';

const { Option } = Select;

function HistoryAdvanceMoneyPage() {
    const [visible, setVisible] = useState(false);
    const [phiUng,setPhiUng] = useState(0);
    const [soTien,setSoTien] = useState(0);
    const [data, setData] = useState([]);
    const [ngayBan,setNgayBan] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const [bankList,setBankList] = useState([])
    const [currentBank,setCurrentBank] = useState("")
    const [itOn,setItOn] = useState(false)
    const [khaDung,setKhaDung] = useState(0)
    const dispatch = useDispatch()
    const date = new Date()
    const [toDate, setToDate] = useState(new Date());
    const [pagination, setPagination] = useState({
        from: getDateBeforeWeek(),
        to: getDateCurrent(),
        stk: currentBank,
        current: 1,
        pageSize: 10,
    })
    
    function getDateCurrent() {
        let date = new Date()
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var d = today.getDate();
        var m = today.getMonth();
        var y = today.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    function getDateBeforeWeek() {
        let date = new Date()
        var nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        var d = nextweek.getDate();
        var m = nextweek.getMonth();
        var y = nextweek.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    const [page, setPage] = useState({
        pageSize: 10,
        current: 1,
        total: 5,
    })


    useEffect(() => {
        fetchBackAccount()
    }, [])
    useEffect(() => {
        //console.log(pagination);
        fetchData(pagination);
    }, [pagination,itOn])
    useEffect(() => {
        handleChangeDateAdvance(moment(new Date().toString()))
    }, [currentBank])
    const fetchBackAccount = async () => {
        setLoading(true)
        try {
            const res = await callApi('TaiKhoanNganHang', 'GET', null)
            setBankList(res.data);
            setLoading(false);
            setCurrentBank(res.data[0]?.stk);
            setItOn(true);
            setPagination(
                {
                    ...pagination,
                    stk: res.data[0]?.stk,
                }
            )
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
        console.log(itOn);
        if(!itOn)
            return;
        setLoading(true)
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `lenhung?${paramsString}`;
            console.log(requestUrl);
            const res = await callApi(requestUrl, 'GET', null)
            setTimeout(() => {
                setLoading(false)
            }, 0);
            console.log(res);
            res.data.list.forEach((e) => {
                let value = new Date(e.ngayYeuCau);
                let dateString = format(value, 'dd/MM/yyyy');
                e.ngayYeuCau = dateString;
                value = new Date(e.ngayBan);
                dateString = format(value,'dd/MM/yyyy');
                e.ngayBan = dateString;
                e.soTien = Formater(e.soTien);
                e.phiUng = Formater(e.phiUng);

                console.log(e);
            })
            setData(res.data.list)
            setPage({ ...page, current: res.data.currentPage, total: res.data.totalItem })

        } catch (error) {
            console.log(error);
        }
    };

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'from': fieldsValue['from'].format('MM-DD-YYYY'),
            'to': fieldsValue['to'].format('MM-DD-YYYY'),
        };
        setPagination(
            {
                ...pagination,
                stk: currentBank,
                from: values.from,
                to: values.to,
                current: 1
            }
        )
        setPage({ ...page, current: 1 })
    };

    const worker = {
        from: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)),
        to: moment(new Date())
    };
    const dateFormat = "DD/MM/YYYY";

    function disabledFromDate(current) {
        return current && current.valueOf() > toDate;
    }
    function disabledToDate(current) {
        return current && current.valueOf() > Date.now();
    }



    const columns = [
        {
            title: 'M?? L???nh ???ng',
            dataIndex: 'maLU',
            key: 'maLU',
            fixed: 'center',
        },
        {
            title: 'Ng??y Y??u C???u',
            dataIndex: 'ngayYeuCau',
            key: 'ngayYeuCau',
            fixed: 'center',
        },
        {
            title: 'Ng??y B??n',
            dataIndex: 'ngayBan',
            key: 'ngayBan',
            fixed: 'center',
        },
        {
            title: 'S??? ti???n',
            dataIndex: 'soTien',
            key: 'soTien',
            fixed: 'center',
        },
        {
            title: 'Ph?? ???ng',
            dataIndex: 'phiUng',
            key: 'phiUng',
            fixed: 'center',
        }
    ]
    const getListBankAccount = bankList?.map((acc, index) => {
        return (
            <Option key={index} value={acc.stk}>{acc.stk}-{acc.nganHang.tenNganHang}</Option>
        )
    })

    const handleChangeBankAccount = (value) => {
        console.log(value);
        setCurrentBank(value);
        setPagination(
            {
                ...pagination,
                stk: value,
            }
        )
    }
    const handleChangeDateAdvance = async (date) => {
        setNgayBan(date);
        date = date.format('MM-DD-YYYY')
        setLoading(true);
        try {
            const res = await callApi(`lenhung/${currentBank}/khadung?date=${date}`, 'GET', null)
            console.log(res.data)
            setKhaDung(Formater(res.data.data));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleVayTien = async (values) => {
        console.log(values);
        var ngayBan = new Date(values.ngayBan.format('MM-DD-YYYY'))
        ngayBan.setHours(ngayBan.getHours() + 7);
        var content = {...values,stk: currentBank,ngayBan: ngayBan};
        console.log(content);
        try {
            const res = await callApi(`lenhung`, 'post', content)
            console.log(res.data)
            if(res.data.data){
                handleChangeDateAdvance(values.ngayBan);
            }
            else{
                openNotificationError('Th???t b???i', res.data.message, 2);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleVayTienPopUp =  () => {
        var lenh = {soTien,ngayBan};
        console.log(lenh)
        handleVayTien(lenh).then(()=>{ fetchData(pagination);});
    }

    const onFinishAdvance = (values) => {
        // handleVayTien(values).then(()=>{
        //     fetchData(pagination);
        // });
        console.log('onFinishAdvance');
        console.log(values);
        
    }

    const showPopconfirm = () => {
        //console.log(values);
        callApi(`lenhung/phiung/${soTien}`, 'GET', null).then((res)=>{
            setPhiUng(res.data.data);
            setVisible(true);
        });
      };
    
      const handleOk = (values) => {
        //setConfirmLoading(true);
        handleVayTienPopUp();
        setTimeout(() => {
          setVisible(false);
          //setConfirmLoading(false);
        }, 2000);
        console.log(soTien);
        console.log(initCanvay);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };

    const initCanvay = {
        ngayBan: moment(new Date().toString()),
        soTien: 0,
        };
    return (
        <>
            <Row>
                <Col span={24}>
                    <Row gutter={40} style={{ margin: '1rem' }}>
                        <Col span={8}>
                            <Form.Item name="stk" label="T??i Kho???n"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n t??i kho???n',
                                    },
                                ]}
                            >
                                <Select style={{ width: 250 }} onChange={handleChangeBankAccount}
                                    defaultValue={"T??i Kho???n M???c ?????nh"}>
                                    {getListBankAccount}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form onFinish={onFinishAdvance} initialValues={initCanvay}  name = 'vaytien'>
                        <Row gutter={40} style={{ margin: '1rem' }}>
                            <Col span={10}>
                                <Form.Item name="ngayBan" label="Ng??y B??n"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng ch???n ng??y',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Ch???n ng??y' format={dateFormat} onChange={(date) => handleChangeDateAdvance(date)} />
                                </Form.Item>
                            </Col>
                            <Col  span={5}>
                                <p>Kh??? d???ng: {khaDung}</p>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="soTien" label="S??? ti???n"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p s??? ti???n',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="S??? ti???n" onChange = {(number) => setSoTien(number) }/>
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
                                    <Popconfirm
                                        title={`B???n c?? mu???n ???ng s??? ti???n: ${soTien} v???i ph??: ${phiUng}`}
                                        visible={visible}
                                        onConfirm={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        <Button type="primary" htmlType="submit" onClick={showPopconfirm}>
                                            ???ng Ti???n
                                        </Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <h3>L???ch s??? ???ng ti???n</h3>
                    <Form onFinish={onFinish} initialValues={worker} name = 'saoke'>
                        <Row gutter={40} style={{ margin: '1rem' }}>
                            
                            <Col span={10}>
                                <Form.Item name="from" label="T??? ng??y"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng ch???n ng??y',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Ch???n ng??y' format={dateFormat} disabledDate={disabledFromDate} />
                                    {/* <RangePicker /> */}
                                </Form.Item>
                            </Col>
                            <Col span={10}>
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
                                         Sao K?? 
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

export default HistoryAdvanceMoneyPage
