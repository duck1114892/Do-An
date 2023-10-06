import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { useSelector } from 'react-redux';
import { callOrders } from '../controller/api';
import { useForm } from 'antd/es/form/Form';

const BuyBtn = (props) => {

    let [quantity, setQuantity] = useState(props.props)
    const [form] = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const name = useSelector(state => state.rootReducer.user.username)
    const email = useSelector(state => state.rootReducer.user.email)
    const isLogin = useSelector(state => state.rootReducer.isLogin)
    const onFinish = async (values) => {

        const product_id = props.propsProductId
        const price = props.propsPrice
        const quantity = props.props
        const category = props.propsType
        const address = values.address
        console.log(address)
        const res = await callOrders(name, email, product_id, price, quantity, category, address)
        console.log(res)
        if (res.statusCode === 201) {
            message.success(res.message)
            form.resetFields()
            setIsModalOpen(false);
        }
        if (res.statusCode === 301) {
            message.warning(res.message)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleError = () => {
        message.error('Vui Lòng Đăng Nhập')
    }



    return (
        <>
            <Button style={{ marginTop: "2%", height: "50px", width: "200px" }} size="large" type="primary" onClick={isLogin ? showModal : handleError}>
                Buy
            </Button>
            <Modal width={900} style={{ fontSize: "80px" }} title="Mua Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 800,

                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Tên">
                        <div>{useSelector(state => state.rootReducer.user.username)}</div>
                    </Form.Item>
                    <Form.Item label="Email">
                        <div>{useSelector(state => state.rootReducer.user.email)}</div>
                    </Form.Item>
                    <Form.Item
                        label="Số Lượng"
                    >

                        <div>{props.props}</div>
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể Loại"
                        name="category"
                    >
                        <div style={{}}>{props.propsType}</div>
                    </Form.Item>
                    <Form.Item
                        label="Tổng Tiền"
                        name="total"
                    >
                        <div style={{ color: "red" }}>{props.propsPrice},000 VND</div>
                    </Form.Item>




                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form >
            </Modal >
        </>
    );
};
export default BuyBtn;