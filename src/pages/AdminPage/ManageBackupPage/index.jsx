import { Button, Col, DatePicker, Form, Input, Row, Select, Table,Checkbox  } from 'antd';
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
function ManageBackupPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const status = useSelector(state => state.Status)
    const dispatch = useDispatch()
    const date = new Date()
    const [disabled, setDisabled] = React.useState(true);
    useEffect(() => {
        fetchData();
    }, [])
    const toggle = () => {
        setDisabled(!disabled);
        console.log("change")
    };
    const fetchData = async () => {
        setLoading(true)
        try {
            const requestUrl = `backup`;
            const res = await callApi(requestUrl, 'GET', null)
            setTimeout(() => {
                setLoading(false)
            }, 0);
            console.log(res);
            res.data.forEach((e) => {
                let date = new Date(e.backup_start_date)
                const dateString = format(date, 'dd/MM/yyyy HH:mm:ss');
                e.backup_start_date = dateString;
            })
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    };
    const handleOkRestore = async (value)=>{
        console.log(value);
        var content = {
            position : value.position,
            checked : false,
            time: new Date()
        }
        console.log(content);
        setLoading(true)
        const requestUrl = `restore`;
        const res = await callApi(requestUrl, 'post', content);
        if(res.data){
            //fetchData();
            openNotificationSuccess('Thành công', res.data.message, 2);
        }
        else
            openNotificationError('Thất bại', res.data.message, 2);
        setLoading(false)
    };
    const showPopRestore = (value)=>{
        //console.log("showPopRestore");
        //console.log(value);
    };
    const onFinish = async (fieldsValue) => {
        const requestUrl = `backup`;
        const res = await callApi(requestUrl, 'post', fieldsValue);
        if(res.data){
            fetchData();
            openNotificationSuccess('Thành công', res.data.message, 2);
        }
        else
            openNotificationError('Thất bại', res.data.message, 2);
    };
    const onFinishRestore = async (fieldsValue)=>{
        var date = fieldsValue.time;
        console.log(date);
        var content = {...fieldsValue,position :-1}
        console.log(content);
        console.log(fieldsValue);
    }
    
    const columns = [
        {
            title: 'Id',
            dataIndex: 'position',
            key: 'position',
            fixed: 'center',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            fixed: 'center',
        },
        {
            title: 'Thời Gian',
            dataIndex: 'backup_start_date',
            key: 'backup_start_date',
            fixed: 'center',
        },
        {
            title: 'Khôi Phục',
            key: 'restore',
            fixed: 'center',
            render: (position) => (
                <>
                    <Popconfirm
                        title="Bạn có muốn phục hồi này không?"
                        // visible={deleteVisible}
                        onConfirm={() => handleOkRestore(position)}
                        // okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                        okText='Xác nhận'
                        cancelText='Hủy bỏ'
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <UndoOutlined
                            onClick={() => showPopRestore(position)}
                            style={{ fontSize: '1.5rem', cursor: 'pointer', textAlign: 'center' }}
                        />
                    </Popconfirm>
                </>
            ),
        }
    ]
    const handleCancel = ()=>{};
    const worker = {
        isAccepted : false
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Form onFinish={onFinish} initialValues={{isAccepted : false}} >
                        <Row gutter={40}>
                            <Col span={3}>
                            <Form.Item name="isAccepted" valuePropName="checked"><Checkbox>Tạo Mới</Checkbox></Form.Item>
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
                                        Sao Lưu
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={24}>
                    <Form onFinish={onFinishRestore} initialValues={{
                        checked : false,
                        position : -1,
                        time : moment((new Date).toString())
                        }} >
                        <Row gutter={40}>
                            <Col span={3}>
                            <Form.Item name="checked"  valuePropName="checked" onChange={toggle}>
                                <Checkbox>Theo thời gian</Checkbox>
                            </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item name = "time" valuePropName="time" >
                                <DatePicker showTime  disabled={disabled}></DatePicker>
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
                                    <Button type="primary" htmlType="submit" disabled={disabled}>
                                        Phục hồi
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
                loading={loading}
            />
        </>
    )
}

export default ManageBackupPage
