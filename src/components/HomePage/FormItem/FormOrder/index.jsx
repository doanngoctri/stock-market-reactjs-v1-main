import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import { openNotificationError } from 'components/Notification';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Formater from '../../../Common/Format'
import * as gia from '../../../../constants/LightningTable/index';
import callApi from '../../../../utils/apiCaller';
import *as Lable from '../../../../constants/Label/Label'
import './FormOrder.css';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    }
};
function FormOrder(props) {
    const { isOpenFormOrder, bank_list, setIsOpenFormOrder, macp, setMacp } = props
    console.log(macp);

    // handle event
    // const user = useSelector(state => state.User)
    // const dispatch = useDispatch();
    // const history = useHistory();
    const LightningTableList = useSelector(state => state.LightningTableList)
    const [bank, setBank] = useState({
        nganhang: "",
        soDu: 0
    });
    const [bankList, setBankList] = useState(bank_list);
    const [stocks, setStocks] = useState([]);
    // const [stock, setStock] = useState({ gia: null, giaTran: null, giaTC: null, giaSan: null, kl: null });
    const [visibleOrder, setVisibleOrder] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [visibleATC, setVisibleATC] = useState(false)
    // const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [order, setOrder] = useState({
        stk: "",
        maCp: "",
        gia: 0,
        soLuong: 0,
        mkdatLenh: "",
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
    });
    const [maCK, setMaCK] = useState();
    useEffect(() => {
        fetchStocks(true)
        isOpenFormOrder ? setVisibleOrder(true) : setVisibleOrder(false)
    }, [])

    useEffect(() => {
        setMaCK(macp)
    }, [macp])

    const onFinish = (values) => {
        // if (values.gia * values.soLuong > bank.soDu) {
        //     openNotificationError('Thất bại', 'Số tiền trong tài khoản không đủ', 3)
        //     return;
        // }
        console.log(values);
        callApi("LenhDat/check", 'post', values).then(res => {
            let rec = res.data;
            console.log(rec);
            if (rec.status === 0) {
                setOrder(values)
                setVisibleConfirm(true)
            } else {
                openNotificationError('Thất bại', rec.message, 3)
                // setConfirmLoading(false);
                setVisibleConfirm(false);
                setIsOpenFormOrder(true)
            }
        })

    }
    const handleConfirm = () => {
        // setConfirmLoading(true);
        callApi("lenhdat", 'post', order).then(res => {
            let rec = res.data;
            if (rec.status === 0) {
                setVisibleOrder(false)
                // setConfirmLoading(false);
                setVisibleConfirm(false);
                setIsOpenFormOrder(false)
            } else {
                openNotificationError('Thất bại', rec.message, 3)
                // setConfirmLoading(false);
                setVisibleConfirm(false);
                setIsOpenFormOrder(true)
            }
        })
        setTimeout(() => {
        }, 2000);
    };
    let findIndex = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].stk.trim() === id?.trim())
                return i;
        return -1;
    }
    let findIndexStock = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].macp.trim() === id?.trim())
                return i;
        return -1;
    }
    let tempValueStock = (id) => {
        let index = findIndexStock(id, LightningTableList)
        console.log(index);
        if (index === -1)
            return null;
        let res = LightningTableList[index];
        return res
    }

    let infoStock = tempValueStock(maCK)
    console.log('mack ', maCK);
    let tempValueBank = (id) => {
        let index = findIndex(id, bankList)
        if (index === -1)
            return;
        let res = bankList[index];
        setBank({ nganhang: res.nganHang.tenNganHang, soDu: Formater(res.soDu) });
    }

    let stockInformation = () => {
        return <React.Fragment>
            <div className="modal-order-matching" style={{ fontWeight: "500", justifyContent: 'center' }}>
                <p className="order-matching-title">Giá: {infoStock?.gia / gia.GIA}</p>
                {/* <span className="order-matching-price">Giá: {infoStock?.gia}</span> */}
                <span>-</span>
                {/* <span className="order-matching-weight" >Số lượng: {infoStock?.kl}</span> */}
                <div className="info-stock info-floor">
                    <label>Trần: </label>
                    <span className="floor">{infoStock?.giaTran / gia.GIA}</span>
                </div>
                <div className="info-stock info-ceil">
                    <label>Sàn: </label>
                    <span className="ceil">{infoStock?.giaSan / gia.GIA}</span>
                </div>
                <div className="info-stock info-standard">
                    <label>TC: </label>
                    <span className="standard">{infoStock?.giaTC / gia.GIA}</span>
                </div>
            </div>
        </React.Fragment>
    }
    let displayBankList = () => {
        if (bankList !== null)
            return bankList.map((value, index) => {
                return <Select.Option value={value.stk}>{value.stk.trim() + " - " + value.nganHang.tenNganHang}</Select.Option>
            })
    }
    let onChangeListStock = (event) => {
        setMaCK(event)
    }
    let onChangeListBank = (event) => {
        tempValueBank(event);
    }
    let ListStock = []
    if (stocks) {
        ListStock = stocks.map((value, index) => {
            return <Select.Option value={value.maCp} key={index}>{value.maCp}</Select.Option>
        })
    }
    let handleChangeTypeTransfer = async (e) => {
        let value = e.target.value
        form.setFieldsValue({
            maCp: null,
        });
        fetchStocks(value)
    }
    const [form] = Form.useForm();
    let onChangeaOrderType = (event) => {
        //console.log(event);
        let type = event.target.value;
        if (type === 'ATO') {
            setVisibleATC(true)
            form.setFieldsValue({
                gia: 0,
            });
        }
        if (type === 'LO') {
            setVisibleATC(false)
            form.setFieldsValue({
                gia: null,
            });
        }

    }


    async function fetchStocks(value) {

        try {
            if (value) {
                let res = await callApi('CoPhieu?current=1&pageSize=1000', 'GET', null);
                setStocks(res.data.list)
                tempValueStock(macp)
            } else {
                let res = await callApi('ChungKhoanHienCo?current=1&pageSize=1000', 'GET', null);
                var filter = res.data.list.filter((stock)=>stock.soLuong>0);
                setStocks(filter)
                // setOrder({ ...order, maCp: '' })
                tempValueStock(macp)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {visibleOrder ?
                <Modal
                    title="Đặt lệnh"
                    centered
                    visible={true}
                    onOk={() => { setVisibleOrder(false); setIsOpenFormOrder(false); setMacp('') }}
                    onCancel={() => { setVisibleOrder(false); setIsOpenFormOrder(false); setMacp('') }}
                    width={800}
                    footer={[
                        <Button type="primary" htmlType="submit" form="my_form">Xác nhận</Button>
                    ]}
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            <Form id='my_form'
                                {...formItemLayout}
                                onFinish={onFinish}
                                form={form}
                                className="modal-form"
                                initialValues={
                                    {
                                        priceBank: bank.soDu, loaiLenh: 'LO',
                                        loaiGiaoDich: true, soLuong: order.soLuong,
                                    }}
                            >
                                <div className='form-child'>
                                    <Form.Item name='stk' label="Số tài khoản"
                                        rules={[{ required: true, message: Lable.KhongBoTrong }]}>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Chọn số tài khoản"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                            onChange={onChangeListBank}
                                        >
                                            {displayBankList()}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        initialValue={macp ? macp : null}
                                        name="maCp"
                                        label="Mã chứng khoán"
                                        rules={[{ required: true, message: Lable.KhongBoTrong }]}>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Chọn mã chứng khoán"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                            onChange={onChangeListStock}
                                        >
                                            {ListStock}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="gia" label="Giá đặt"
                                        rules={[{ required: true, message: Lable.KhongBoTrong }]}>
                                        <InputNumber style={{ width: '100%' }} disabled={visibleATC} />
                                    </Form.Item>
                                    <Form.Item name='loaiLenh' style={{ textAlign: 'center' }}  >
                                        <Radio.Group defaultValue='LO' onChange={onChangeaOrderType}>
                                            <Radio value='ATC' disabled>ATC</Radio>
                                            <Radio value='ATO'>ATO</Radio>
                                            <Radio value='LO'>LO</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div className='form-child'>
                                    <Form.Item label="Số dư tài khoản">
                                        <Input value={bank.soDu} disabled style={{ width: '100%', color: '#1890ff', fontWeight: 'bold' }} />
                                        <span style={{ display: 'none' }}>{bank.soDu}</span>
                                    </Form.Item>
                                    <Form.Item name='soLuong' label="Khối lượng"
                                        rules={[{ required: true, message: Lable.KhongBoTrong }]}>
                                        <InputNumber min={1} max={100000} style={{ width: '100%' }} value={order.soLuong} />
                                    </Form.Item>
                                    <Form.Item name="mkdatLenh" label="Mã pin"
                                        rules={[{ required: true, message: Lable.KhongBoTrong }]}>
                                        <Input.Password
                                            placeholder="Nhập mã pin"
                                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    </Form.Item>

                                    <Form.Item name='loaiGiaoDich' style={{ textAlign: 'center' }}>
                                        <Radio.Group defaultValue={true} buttonStyle="solid" onChange={handleChangeTypeTransfer}>
                                            <Radio.Button className='radio-btn-type' value={true} >Mua</Radio.Button>
                                            <Radio.Button value={false}>Bán</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div className="modal-show-stock">
                            {stockInformation()}
                        </div>
                    </div>
                    <small style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
                        Giá x 1000 VNĐ. Bản quyền thuộc về Công ty Cổ phần Chứng khoán NTNT. © 2021.
                    </small>
                    {visibleConfirm
                        ? <Modal
                            style={{ marginTop: 140, whiteSpace: 'nowrap' }}
                            title="XÁC NHẬN ĐẶT LỆNH"
                            visible={visibleConfirm}
                            onOk={handleConfirm}
                            onCancel={() => setVisibleConfirm(false)}
                            okText="Xác nhận"
                            cancelText="Đóng"
                        // confirmLoading={confirmLoading}
                        >
                            <div class="modal-info">
                                <p class="modal-info-title">Quý khách có thật sự muốn đặt lệnh <span className={order.loaiGiaoDich ? "color-green" : "color-red"}>{order.loaiGiaoDich ? 'Mua' : 'Bán'}</span>
                                </p>
                                <div className="modal-info-detail">
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Mã CK:</p>
                                        <strong className="modal-info-value">{order.maCp}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Khối lượng:</p>
                                        <strong className="modal-info-value">{order.soLuong}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Giá đặt:</p>
                                        <strong className="modal-info-value">{order.gia}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Tài khoản:</p>
                                        <strong className="modal-info-value color-red">{order.stk}</strong>
                                    </div>
                                </div>
                            </div>

                        </Modal> : null
                    }
                </Modal> : null}
        </>
    )
}
export default FormOrder
