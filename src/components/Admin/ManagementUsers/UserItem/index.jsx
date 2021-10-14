import { format } from 'date-fns'
import React from 'react'

export default function RegisterFormItem(props) {
    let { user, index } = props
    let value = new Date(user.ngaySinh)
    const dateString = format(value, 'dd/MM/yyyy')
    return (
        <tr>
            {/* <td >{index + 1}</td> */}
            <td >{user.maNdt}</td>
            <td >{`${user.ho} ${user.ten}`}</td>
            <td >{`${user.phai ? 'Nam' : 'Nữ'}`} </td>
            <td >{user.cmnd}</td>
            <td >{dateString}</td>
            <td >{user.noiSinh}</td>
            <td >{user.diaChi}</td>
            <td >{user.email}</td>
            <td >{user.sdt}</td>
        </tr>
    )
}
