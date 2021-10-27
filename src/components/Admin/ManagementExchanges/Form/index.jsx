import React from "react";
import { Modal, Form, Button, Input , InputNumber , DatePicker } from "antd";

import moment from "moment";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Modals(props) {
  const handleCancel = () => {
    props.onCloseModal();
  };

  const onFinish = (values) => {
      props.onClickUpdate(values);
  };
  const onFinishFailed = () => {};
  return (
    <Modal
      title={"Chỉnh sửa quy định công ty"}
      visible={props.isVisible}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" htmlType="submit" form="my_form">
          Xác nhận
        </Button>,
        <Button type="" htmlType="submit" onClick={handleCancel}>
          Hủy
        </Button>,
      ]}
    >
      <Form
        id="my_form"
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ margin: "auto" }}
        preserve={true}
      >
        <Form.Item
          label="Mã quy định"
          name="maQd"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống !. Vui lòng nhập lại",
            },
          ]}
          hasFeedback
          initialValue={props.value?.maQd }
          
        >
          <Input maxLength={10} allowClear disabled/>
        </Form.Item>
        <Form.Item
          label="Tên quy định"
          name="tenQuyDinh"
          hasFeedback
          initialValue={props.value?.tenQuyDinh }
          
        >
          <Input allowClear disabled/>
        </Form.Item>
        <Form.Item
          label="Ngày áp dụng"
          name="ngayApDung"
          hasFeedback
          initialValue={moment(props.value?.ngayApDung)}
          
        >
            <DatePicker  disabled style={{width:"100%"}} placeholder="Chọn ngày" />
        </Form.Item>
        <Form.Item
          label="Gía trị"
          name="giaTri"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống !. Vui lòng nhập lại",
            }
          ]}
          hasFeedback
          initialValue={props.value?.giaTri }
          
        >
          <InputNumber min="0" style={{ width : '100%'}}  allowClear/>
        </Form.Item>
        <Form.Item
          label="Mã sàn"
          name="maSan"
          hasFeedback
          initialValue={props.value?.maSan }
          
        >
          <Input allowClear disabled/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Modals;
