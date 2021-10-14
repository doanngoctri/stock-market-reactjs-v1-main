import React from 'react'

export default function RegisterFormList(props) {
    return (
        <>
            <div className="right__title">Bảng điều khiển</div>
            <p className="right__desc">Quản lý nhà đầu tư</p>
            <div className="right__table">
                <div className="right__tableWrapper">
                    <table>
                        <thead>
                            <tr>
                                {/* <th>STT</th> */}
                                <th>Mã NDT</th>
                                <th>Họ Tên</th>
                                <th>Giới tính</th>
                                <th>CMND</th>
                                <th>Ngày sinh</th>
                                <th>Nơi sinh</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
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
