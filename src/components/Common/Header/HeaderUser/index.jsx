import { UserOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function HeaderUser(props) {
    const user = useSelector(state => state.User);
    const content = (
        (user === null) ?
            <div>
                <p>
                    <Link className="header__right-account-item" to="/login">
                        Đăng Nhập </Link>
                </p>

            </div>
            : <div>
                <Link to=''> </Link>
                <Link to='/thong-tin-khach-hang' className="header__right-account-item">Thông tin tài khoản </Link>
                <Link to='/khach-hang/chung-khoan-hien-co' className="header__right-account-item">Thông tin sao kê </Link>
                <Link className="header__right-account-item" to="/logout">
                    Đăng xuất </Link>
            </div>
    );
    return (
        <>
            <Popover
                content={content}
                title="Chào mừng đến với iBoard "
                trigger="focus"
                placement="bottomRight"
            >
                <Button className="ant-dropdown-link header__right-account-label">
                    <Avatar
                        style={{
                            backgroundColor: '#87d068'
                        }}
                        icon={<UserOutlined />}
                    />
                </Button>
            </Popover>
        </>
    );
}
export default HeaderUser;