import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { callUser } from '../../controller/api';
const { Column, ColumnGroup } = Table;

const Crud = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const listUser = async () => {
            const res = await callUser()
            setData(res.array)
            console.log('lamo:', res)
        }
        listUser()
    }, [])
    console.log(data)
    return (
        <Table dataSource={data}>
            <Column title="UserName" dataIndex="username" key="username" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Email" dataIndex="email" key="email" />

        </Table>
    );
}
export default Crud;