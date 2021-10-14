import React from 'react';
import { Link } from 'react-router-dom';
import ntnt from '../../../assets/images/ntnt.png';
import HeaderDate from './HeaderDate';
import HeaderTimes from './HeaderTime';
import HeaderUser from './HeaderUser';
function Header(props) {
  //const token = JSON.parse(localStorage.getItem("token"));
  return (
    <header className="header topbar" id="header">
      <div className="header__left">
        <Link to="/" className="header__logo"><img src={ntnt} alt="" className="img-responsive" />iBoard</Link>
      </div>
      <div className="header__right">
        <HeaderTimes />
        <HeaderDate />
        <HeaderUser />
      </div>
    </header>
  );
}
export default Header;

