import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons'
import React from 'react'

export default function RegisterFormItem(props) {
    let { stock, index } = props
    return (
        <tr>
            <td >{index + 1}</td>
            <td >{stock.maCp}</td>
            <td >{stock.tenCongTy}</td>
            <td >{stock.diaChi}</td>
            <td >{stock.diaChiWebsite}</td>
            <td >{stock.fax}</td>
            <td >{stock.email}</td>
            <td >{stock.sdt}</td>
            <td >{stock.sanGiaoDich.maSan}</td>
        </tr>
    )
}
