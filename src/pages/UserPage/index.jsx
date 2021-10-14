import { Divider, Tag } from 'antd';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import React from 'react';
import { Route } from 'react-router-dom';
import MenuUser from '../../components/Common/MenuUser';
import ChargeInBankAccount from './ChargeInBankAccountPage';
import HistoryOrderPage from './HistoryOrderPage';
import HistoryPurchasedPage from './HistoryPurchasedPage';
import PurchasedOneDayPage from './PurchasedOneDayPage';
import HistoryAdvanceMoneyPage from './HistoryAdvanceMoneyPage';
import StockPage from './StockPage';
import './user.css';
function UserPage(props) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {/* <Header /> */}
            <main className="main-user">
                <div className="container content-wp">
                    <div className="row">
                        <div className="col col-12">
                            <Divider orientation="left"> <Tag style={{ fontSize: '1rem' }} color="volcano">Họ và tên: {user.ho} {user.ten} <br /> Mã NDT: {user.maNdt}</Tag> </Divider>
                            <MenuUser path={props.history.match.path} />
                            <>
                                <Route exact path='/khach-hang/lich-su-dat-lenh' component={HistoryPurchasedPage} />
                                <Route exact path='/khach-hang/chung-khoan-hien-co' component={StockPage} />
                                <Route exact path='/khach-hang/lich-su-khop-lenh' component={HistoryOrderPage} />
                                <Route exact path='/khach-hang/so-du-tien-ngan-hang' component={ChargeInBankAccount} />
                                <Route exact path='/khach-hang/lenh-trong-ngay' component={PurchasedOneDayPage} />
                                <Route exact path='/khach-hang/lenh-ung' component={HistoryAdvanceMoneyPage} />
                            </>
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default UserPage
