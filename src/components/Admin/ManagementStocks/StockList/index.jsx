import React from 'react'

export default function RegisterFormList(props) {
    return (
        <>
            <div className="right__title">Bảng điều khiển</div>
            <p className="right__desc">Quản lý nhà cổ phiếu</p>
            <div className="right__table">
                <div className="right__tableWrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Cổ phiếu</th>
                                <th>Tên Công ty</th>
                                <th>Địa chỉ</th>
                                <th>Địa chỉ Website</th>
                                <th>Fax</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Sàn giao dịch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
