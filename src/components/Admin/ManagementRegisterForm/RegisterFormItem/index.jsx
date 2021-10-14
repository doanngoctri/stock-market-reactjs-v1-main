import { CheckCircleTwoTone, DeleteTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import React from 'react'

export default function RegisterFormItem(props) {
    let { formRegister } = props
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [confirmVisible, setConfirmVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showPopDelete = () => {
        setDeleteVisible(true);
    };
    const showPopConfirm = () => {
        setConfirmVisible(true);
    };

    const handleOkConfirm = () => {
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setConfirmLoading(false);
        // }, 2000);
        setConfirmVisible(false);
        props.handleConfirmChange(formRegister.maDon)
    };
    const handleOkDelete = () => {
        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setConfirmLoading(false);
        // }, 2000);
        setDeleteVisible(false);
        props.handleDeleteChange(formRegister.maDon)
    };

    const handleCancel = () => {
        setDeleteVisible(false);
        setConfirmVisible(false);
    };
    return (
        <tr>
            {/* <td >{index + 1}</td> */}
            <td >{formRegister.maDon}</td>
            <td >{`${formRegister.ho} ${formRegister.ten}`}</td>
            <td >{`${formRegister.phai ? 'Nam' : 'Nữ'}`} </td>
            <td >{formRegister.cmnd}</td>
            <td >{formRegister.diaChi}</td>
            <td >{formRegister.email}</td>
            <td >{formRegister.sdt}</td>
            <td className="right__iconTable">
                <Popconfirm
                    title="Bạn có muốn xác nhận đơn đăng ký này không?"
                    visible={confirmVisible}
                    onConfirm={handleOkConfirm}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                    okText='Xác nhận'
                    cancelText='Hủy bỏ'
                >
                    {/* <Button type="primary" >
                        Open Popconfirm with async logic
                    </Button> */}
                    <a onClick={showPopConfirm}><CheckCircleTwoTone style={{ fontSize: '20px' }} /></a>
                </Popconfirm>
            </td>
            <td className="right__iconTable">

                <Popconfirm
                    title="Bạn có muốn hủy đơn đăng ký này không?"
                    visible={deleteVisible}
                    onConfirm={handleOkDelete}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                    okText='Xác nhận'
                    cancelText='Hủy bỏ'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                    <a onClick={showPopDelete}><DeleteTwoTone style={{ fontSize: '20px' }} /></a>
                </Popconfirm>

            </td>
        </tr>
    )
}
