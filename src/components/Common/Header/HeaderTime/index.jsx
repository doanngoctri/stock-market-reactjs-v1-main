import React, { useState } from 'react';
import Clock from 'react-live-clock';

const HeaderTimes = () => {
    return (
        <div className="header__right-realtime">
            {/* <strong className="header__right-realtime-label" style={{ color: '#333' }}>29/08/2021 - 14:14:55</strong> */}
            <strong className="header__right-realtime-label" style={{ color: '#333' }}><Clock format={'DD/MM/yyyy - HH:mm:ss'} ticking={true} timezone={'Asia/Ho_Chi_Minh'} /></strong>
        </div>
    );
}
export default HeaderTimes;