import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Modal from 'antd/lib/modal/Modal';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import { format } from 'date-fns';
import React, { useState } from 'react';
import callApi from '../../../utils/apiCaller';
import './infoUser.css';

const { Title } = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
export default function InfoUserPage() {
    let user = JSON.parse(localStorage.getItem('user'))
    const [visible, setVisible] = useState(false);
    const [visiblePin, setVisiblePin] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: ""
    })
    let value = new Date(user.ngaySinh)
    const ngaySinh = format(value, 'dd/MM/yyyy')
    value = new Date(user.ngayCapCmnd)
    const ngayCapCmnd = format(value, 'dd/MM/yyyy')

    const [form] = Form.useForm();

    const showModalChangePIN = () => {
        setVisible(true);
        setVisiblePin(true);
    };
    const showModalChangePassWord = () => {
        setVisible(true);
        setVisiblePassword(true);
    };

    const handleCancel = () => {
        setVisiblePin(false);
        setVisiblePassword(false);
        setVisible(false);
        form.resetFields();
    };

    const fetchChange = async (data) => {
        try {
            console.log(data);
            if (visiblePassword) {
                const res = await callApi("MatKhau/DangNhap", 'PUT', data)
                console.log(res.data);
                if (res.data.status === 400) {
                    openNotificationError('Thất bại', res.data.message, 3)
                }
                else {
                    openNotificationSuccess('Thành công', res.data.message, 3)
                    setTimeout(() => {
                        setVisible(false);
                        setVisiblePin(false);
                        setVisiblePassword(false);
                        form.resetFields();
                    }, 3000);
                }
                setConfirmLoading(false);
            } else {
                const res = await callApi("MatKhau/DatLenh", 'PUT', data)
                console.log(res.data);
                if (res.data.status === 400) {
                    openNotificationError('Thất bại', res.data.message, 3)
                }
                else {
                    openNotificationSuccess('Thành công', res.data.message, 3)
                    setTimeout(() => {
                        setVisible(false);
                        setVisiblePin(false);
                        setVisiblePassword(false);
                        form.resetFields();
                    }, 3000);
                }
                setConfirmLoading(false);
            }
        } catch (error) {
            openNotificationError('Thất bại', 'Thông tin bạn nhập không chính xác', 2);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setConfirmLoading(true);
        fetchChange({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        })

    };
    return (
        <div className='container content-wp' style={{ position: 'relative' }}>
            <Content style={{ backgroundColor: '#e6f7ff', margin: '100px auto', position: 'absolute' }}>
                <Title level={2} style={{ textAlign: 'center' }} type="danger">Thông tin nhà đầu tư</Title>
                <Row>
                    <Col span={6} offset={4}>
                        <Form.Item
                            className='label-info-user'
                            label="Mã nhà đầu tư"
                        >
                            <label className='info-user'>{user.maNdt}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Họ và tên"
                        >
                            <label className='info-user'>{user.ho} {user.ten}</label>
                        </Form.Item>
                        {/* <Form.Item
                            className='label-info-user'
                            label="Tên"
                        >
                            <label className='info-user'>{user.ten}</label>
                        </Form.Item> */}
                        <Form.Item
                            className='label-info-user'
                            label="Nơi sinh">
                            <label className='info-user'>{user.noiSinh}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Địa chỉ">
                            <label className='info-user'>{user.diaChi}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Ngày sinh">
                            <label className='info-user'>{ngaySinh}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Giới tính">
                            <label className='info-user'>{user.phai ? 'Nam' : 'Nữ'}</label>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={4}>

                        <Form.Item
                            className='label-info-user'
                            label="Email"
                        >
                            <label className='info-user'>{user.email}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Số điện thoại"
                        >
                            <label className='info-user'>{user.sdt}</label>

                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="CMND">
                            <label className='info-user'>{user.cmnd}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Ngày cấp CMND">
                            <label className='info-user'>{ngayCapCmnd}</label>
                        </Form.Item>
                        <Form.Item
                            className='label-info-user'
                            label="Nơi cấp CMND">
                            <label className='info-user'>{user.noiCapCmmd}</label>
                        </Form.Item>
                    </Col>
                    <Col span={20} offset={5}>
                        <Row>
                            <Col span={2} offset={4}>
                                <Form.Item
                                    className='label-info-user'>
                                    <Button type="primary" danger onClick={showModalChangePassWord}>Đổi Mật khẩu</Button>
                                </Form.Item>

                            </Col>
                            <Col span={2} offset={4}>
                                <Form.Item
                                    className='label-info-user'>
                                    <Button type="primary" onClick={showModalChangePIN}>Đổi Mã PIN</Button>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>

            <Modal
                title={visiblePassword ? "Đổi mật khẩu" : "Đổi mã Pin"}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy bỏ
                    </Button>,
                    visiblePassword ?
                        <Button key="submit" type="primary" danger htmlType="submit" loading={confirmLoading} onClick={form.submit} >
                            Xác nhận
                        </Button>
                        : <Button key="submit" type="primary" htmlType="submit" loading={confirmLoading} onClick={form.submit} >
                            Xác nhận
                        </Button>,
                ]}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="changePassword"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="oldPassword"
                        label={visiblePassword ? "Mật khẩu cũ" : "Mã Pin cũ"}

                        rules={[
                            {
                                required: true,
                                message: visiblePassword ? "Vui lòng nhập mật khẩu cũ!" : "Vui lòng nhập mã Pin cũ!"

                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label={visiblePassword ? "Mật khẩu mới" : "Mã Pin mới"}
                        rules={[
                            {
                                required: true,
                                message: visiblePassword ? "Vui lòng nhập mật khẩu mới!" : "Vui lòng nhập mã Pin mới!"

                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmNewPassword"
                        label={visiblePassword ? "Nhập lại mật khẩu mới" : "Nhập lại mã Pin mới"}
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: visiblePassword ? "Vui lòng nhập lại mật khẩu mới!" : "Vui lòng nhập lại mã Pin mới!"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Hai mật khẩu bạn đã nhập không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
