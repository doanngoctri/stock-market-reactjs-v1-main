import { EditOutlined } from "@ant-design/icons";
import React from "react";

export default function RegisterFormItem(props) {
  let { value, index } = props;

  const onClick = (value)=>{
    props.setValue(value);
    props.setOpenMoal(true);
  }
  return (
    <tr>
      <td>{index +1 }</td>
      <td>{value?.maQd}</td>
      <td>{value?.tenQuyDinh}</td>
      <td>{value?.ngayApDung}</td>
      <td>{value?.giaTri}</td>
      <td>{value?.maSan}</td>
      <td 
      onClick={e => onClick(value)}
      style={{
        cursor: "pointer"
      }}>
        <EditOutlined />
      </td>
    </tr>
  );
}
