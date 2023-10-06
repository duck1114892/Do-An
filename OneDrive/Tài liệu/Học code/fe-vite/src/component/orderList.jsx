import { Avatar, Button, Collapse, List, Popover, message } from 'antd';
import { useEffect, useState } from 'react';

import { callDeleteCart, callDeleteOrder, callGetCart, callOrdering } from '../controller/api';
import { useSelector } from 'react-redux';

const OrderList = () => {

    const username = useSelector(state => state.rootReducer.user.username);
    const [data, setData] = useState();
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(false);
    const [deleteInit, setDeleteInit] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await callOrdering(username);
                let value = res.array
                setData(value.map((item) => {
                    return item
                }))
                value.map((item) => {
                    setDetail(item.detail)
                })
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username, deleteInit]);

    const handleDelete = async (id) => {
        try {
            const resDelete = await callDeleteOrder(id);
            if (resDelete.statusCode === 201) {
                message.success(resDelete.message);
                setData(prevData => prevData.filter(item => item.id !== id));
                setDeleteInit(deleteInit + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handlePrice = (price) => {
        const numericPrice = Number(price);
        return numericPrice.toLocaleString('en-US');
    };
    const content = (
        <List
            size="small"
            bordered
            dataSource={detail}
            loading={loading}
            renderItem={(item) => (
                <List.Item
                >

                    <List.Item.Meta
                        title={<a> {item.name}  Price :{handlePrice(item.price)},000VND </a>}
                        description={<>Số Lượng: {item.quantity}</>}
                    />
                </List.Item>
            )}
        />
    );

    return (
        <div style={{ height: '600px', overflowY: 'auto' }}>

            <List
                size="large"
                bordered
                dataSource={data}
                loading={loading}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <a onClick={() => handleDelete(item.id)} key="list-loadmore-more">Delete</a>
                        ]}
                    >
                        <List.Item.Meta
                            title={<Popover content={content} title="Sản Phẩm"> <a>{item.id} - {item.name} - Email:{item.email} - Địa Chỉ: {item.address} </a> </Popover>}
                            description={item.quantity}
                        />

                    </List.Item>
                )}
            />
        </div>
    );
};

export default OrderList;
