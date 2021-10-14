import React, { useState, useEffect } from 'react';

const HeaderDate = () => {

    let [date, setDate] = useState(new Date())
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setDate(new Date())
    //         console.log(date);
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);
    return (
        <div className="header__right-date">
        </div>
    );
}

export default HeaderDate;