import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import callApi from 'utils/apiCaller';
import * as ActionLogin from '../../../constants/User/ActionType';
import * as ActionIsAdmin from '../../../constants/Admin/ActionType';
import * as ActionToken from '../../../constants/Token/ActionType';
import useLoading from '../../HookLoading';
import { openNotificationError, openNotificationSuccess } from '../../Notification';

// import '../style.css';
const MainLogin = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [Loading, Hidden, Display] = useLoading();
    const onFinish = async (values) => {
        try {
            Display();
            let res = await callApi('dangnhap', 'POST', { userName: values.username, passWord: values.password })
            Hidden();
            console.log(res.data);
            let { data } = res.data
            if (res.data.status === 0) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                openNotificationSuccess('Thành công', res.data.message, 3)
                if (data.role === 'admin') {
                    history.replace('/admin');
                    dispatch({ type: ActionToken.ADD_TOKEN });
                    dispatch({ type: ActionIsAdmin.IS_ADMIN });
                }
                else {
                    history.replace('/');
                    dispatch({ type: ActionToken.ADD_TOKEN });
                }
            }
            else {
                openNotificationError('Thất bại', res.data.message, 3);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main className="main">
            <div className="container">
                <div className="content-login">
                    <div className="form-login">
                        <h5 className="form-title">Đăng nhập</h5>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Tài khoản"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Link to="/register" className='title-login'>Đăng ký tài khoản ?</Link>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default MainLogin;
