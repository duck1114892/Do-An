import { Avatar, Button, Form, List, message, Input } from 'antd';
import { useEffect, useState } from 'react';
import { callAddCartDb, callDeleteCart, callGetCart } from '../controller/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImportOutlined } from '@ant-design/icons';

const CartPage = () => {
    const username = useSelector(state => state.rootReducer.user.username);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteInit, setDeleteInit] = useState(1);
    const [priceInit, setPriceInit] = useState();
    const nagivate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await callGetCart(username);
                setData(res.array);
                setPriceInit(res.total);
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
            const resDelete = await callDeleteCart(id);
            if (resDelete.statusCode === 201) {
                message.success(resDelete.message);
                setData((prevData) => prevData.filter(item => item.id !== id));
                setDeleteInit(deleteInit + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        console.log(values.address, localStorage.getItem('username'));
        const res = await callAddCartDb(localStorage.getItem('username'), values.address);
        if (res.statusCode === 201) {
            message.success(res.message);
            setTimeout(() => {
                nagivate('/book')
            }, 2000)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePrice = (price) => {
        const numericPrice = Number(price) // Chuyển đổi sang kiểu số
        return numericPrice.toLocaleString('en-US');
    };

    const formatPrice = (price) => {
        const numericPrice = Number(price); // Chuyển đổi sang kiểu số
        return numericPrice.toLocaleString('en-US');
    };
    return (
        <>
            <div style={{ height: "50px" }}><a href='/book'><ImportOutlined style={{ fontSize: "40px" }} /></a></div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1', overflowY: 'auto' }}>
                    <List
                        size='large'
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
                                    style={{ fontSize: "50px" }}
                                    avatar={<Avatar src={`${item.img}`} />}
                                    title={<a>ID: {item.id}  {item.name} - Giá :{handlePrice(item.price)} VND </a>}
                                    description={<>Số Lượng : {item.quantity}</>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <div style={{ marginLeft: '20px', width: "500px" }}>
                    <div style={{ position: "fixed" }}>
                        <div style={{ fontSize: "40px", fontFamily: "sans-serif" }}>Total: <span style={{ color: "red" }}>{formatPrice(priceInit)}</span> VND </div>
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Địa Chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Địa Chỉ',
                                    },
                                ]}
                            >
                                <Input style={{ width: "100%", height: "90px", fontSize: "20px" }} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button style={{ width: "190px", height: "60px", fontSize: "20px" }} type="primary" htmlType="submit">
                                    Đặt Hàng
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CartPage;
