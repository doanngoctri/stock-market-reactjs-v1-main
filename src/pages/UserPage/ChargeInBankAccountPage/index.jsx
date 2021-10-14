import { Col, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as type_back from '../../../constants/Common/ActionType';
import callApi from '../../../utils/apiCaller';
import Formater from '../../../components/Common/Format'

const { Option } = Select;
function ChargeInBankAccount() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const bankList = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchBackAccount()
    }, [])

    const fetchBackAccount = async () => {
        setLoading(true)
        try {
            const res = await callApi('TaiKhoanNganHang', 'GET', null)
            dispatch({ type: type_back.FETCH_BANK_ACCOUNT, payload: res.data })
            res.data.forEach((e) => {
                
                e.soDu = Formater(e.soDu);
                e.tongSoTien = Formater(e.tongSoTien);
                e.choThanhToan = Formater(e.choThanhToan);
                e.soDuT0 = Formater(e.soDuT0);
                e.soDuT1 = Formater(e.soDuT1);
                e.soDuT2 = Formater(e.soDuT2);
            })
            let temp = []
            temp.push(res.data[0])
            setData(temp)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangeBankAccount = (value) => {
        let result = {}
        let temp = []
        bankList.forEach((bank) => {
            if (parseInt(bank.stk) === parseInt(value))
                result = bank
        })
        temp.push(result)
        setData(temp)

    }

    const columns = [
        {
            title: 'Số dư tài khoản',
            dataIndex: 'soDu',
            key: 'soDu',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'tongSoTien',
            key: 'tongSoTien',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tiền mua chờ thanh toán',
            dataIndex: 'choThanhToan',
            key: 'choThanhToan',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Giá trị giao dịch chờ thanh toán',
            children: [
                {
                    title: 'T0',
                    dataIndex: 'soDuT0',
                    key: 'soDuT0',
                    width: 150,

                },
                {
                    title: 'T1',
                    dataIndex: 'soDuT1',
                    key: 'soDuT1',
                    width: 150,
                },
                {
                    title: 'T2',
                    dataIndex: 'soDuT2',
                    key: 'soDuT2',
                    width: 150,
                }

            ],
        }
    ]

    const getListBankAccount = bankList.map((acc, index) => {
        return (
            <Option key={index} value={acc.stk}>{acc.stk}-{acc.nganHang.tenNganHang}</Option>
        )
    })
    console.log(data[0]);
    return (
        <>
            <Row style={{ margin: '1rem' }}  >
                <Col span={18}>
                    <Select style={{ width: 250 }}
                        onChange={handleChangeBankAccount}
                        value={data[0]?.stk}
                    >
                        {getListBankAccount}

                    </Select>,
                </Col>

            </Row>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </>
    )
}

export default ChargeInBankAccount
