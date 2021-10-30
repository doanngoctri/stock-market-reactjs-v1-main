import { ContactsTwoTone, GoldTwoTone, IdcardTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/ntnt.png'
export default function LeftMenu() {
    return (
        <>
            <div className="left">
                <div className="left__content">
                    <div style={{ width: '140px', margin: '0 auto' }}> <img className='img-responsive' src={logo} alt='logo'></img> </div>
                    <ul className="left__menu">
                        <li className="left__menuItem">
                            <Link to="/admin/don-dang-ky" className="left__title"><IdcardTwoTone />Quản lý đơn đăng ký</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quan-ly-ndt" className="left__title"><ContactsTwoTone />Quản lý nhà đầu tư</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quan-ly-cp" className="left__title"> <GoldTwoTone />Quản lý cổ phiếu</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/backup" className="left__title"> <GoldTwoTone />Backup and Restore</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quy-dinh-san" className="left__title"> <GoldTwoTone />Quy định sàn</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quy-dinh-cong-ty" className="left__title"> <GoldTwoTone />Quy định công ty</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/logout" className="left__title"><RightCircleTwoTone />Đăng Xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
