import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
import *as Lable from '../../../constants/Label/Label'

import '../style.css';
// import './MainRegister.css';
const { Option } = Select;
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const MainRegister = (props) => {
    const history = useHistory();
    const [toDate, setToDate] = useState(new Date());
    const onFinish = async (values) => {
        try {
            console.log(values);
            const res = await callApi("dangky", 'post', values)
            console.log(res);
            if (res.data.status === 0) {
                openNotificationSuccess('Thành công', res.data.message, 3)
                history.replace("/login");
            }
            else {
                openNotificationError('Thất bại', res.data.message, 3)
            }

        } catch (err) {
            // console.log(err);
            openNotificationError('Thất bại', Lable.ThongBaoThatBai, 3);
        }
    };

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const [form] = Form.useForm();
    function disabledToDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() > Date.now();
    }
    return (
        <main className="main">
            <div className="container">
                <div className="content-login register">
                    <div className="form-login" >
                        <Title level={2} className="form-title">Đăng ký tài khoản</Title>
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{

                            }}
                            scrollToFirstError

                        >
                            <div className='form-register'>
                                <div className="form-child">
                                    <Form.Item
                                        name="ho"
                                        label="Họ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập họ!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="ten"
                                        label="Tên"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        name="ngaySinh"
                                        label="Ngày sinh"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số ngày sinh!',
                                            },
                                        ]}
                                    >
                                        <DatePicker label="Ngày sinh" placeholder="Chọn ngày sinh" disabledDate={disabledToDate} format={dateFormatList} />
                                    </Form.Item>
                                    <Form.Item
                                        name="sdt"
                                        label="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            // addonBefore={prefixSelector}
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Dữ liệu không phải E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="phai"
                                        label="Giới tính"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn giới tính!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn giới tính của bạn">
                                            <Option value={true}>Nam</Option>
                                            <Option value={false}>Nữ</Option>
                                        </Select>
                                    </Form.Item>


                                </div>
                                <div className="form-child">

                                    <Form.Item
                                        name="noiSinh"
                                        label="Nơi sinh"
                                        tooltip="Quê quán nơi sinh ra của bạn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập nơi sinh!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="diaChi"
                                        label="Địa chỉ"
                                        tooltip="Nơi tạm trú của bạn hiện tại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="cmnd"
                                        label="CMND"
                                        tooltip="CMND hoặc Căn cước công dân (nếu có)"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập CMND!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="noiCapCMMD"
                                        label="Nơi cấp CMND"
                                        // tooltip="Căn cước công dân hoặc CMND"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập nơi cấp CMND!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
                                        name="ngayCapCMND"
                                        label="Ngày cấp CMND"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập ngày cấp CMND!',
                                            },
                                        ]}
                                    >
                                        <DatePicker placeholder="Ngày cấp CMND" disabledDate={disabledToDate} format={dateFormatList} onChange={(date) => setToDate(date)} />
                                    </Form.Item>


                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Tạo tài khoản
                                        </Button>
                                    </Form.Item>
                                    <Link to="/login" className='title-login'>Đăng nhập?</Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainRegister;
