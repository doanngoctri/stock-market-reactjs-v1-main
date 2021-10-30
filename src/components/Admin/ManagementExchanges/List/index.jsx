import React from "react";

export default function RegisterFormList(props) {
  return (
    <>
      <div className="right__title">Bảng điều khiển</div>
      <p className="right__desc">Quy định sàn </p>
      <div className="right__table">
        <div className="right__tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Mã quy định</th>
                <th>Tên quy định</th>
                <th>Ngày áp dụng</th>
                <th>Gía trị</th>
                <th>Mã sàn</th>
                <th>Sửa</th>
              </tr>
            </thead>
            <tbody>{props.children}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
