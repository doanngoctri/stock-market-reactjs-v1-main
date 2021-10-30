import { EditOutlined } from "@ant-design/icons";
import React from "react";
import { format } from 'date-fns'

export default function RegisterFormItem(props) {
  let { value, index } = props;

  const onClick =(value)=>{
    props.setValue(value);
    props.setOpenMoal(true);
  }
  let ngayApDung = new Date(value?.ngayApDung)
  const dateString = format(ngayApDung, 'dd/MM/yyyy')
  return (
    <tr>
      <td>{value?.maQd}</td>
      <td>{value?.tenQuyDinh}</td>
      <td>{dateString}</td>
      <td>{value?.giaTri}</td>
      <td style={{
        cursor: 'pointer'
      }}
      onClick={e=> onClick(value)}
      >
        <EditOutlined />
      </td>
    </tr>
  );
}
