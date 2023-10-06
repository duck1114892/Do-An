import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, message } from 'antd';
import { callUpdateOder } from '../../controller/api';
const UpdateOrder = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryDate, setDeliveyDate] = useState()
    const [form] = Form.useForm();
    const [expectedDateOfReceipt, SetExpectedDateOfReceipt] = useState()
    const onFinish = async (values) => {
        let { deliver } = values
        let id = props.props

        const res = await callUpdateOder(id, deliver, deliveryDate, expectedDateOfReceipt)
        if (res.statusCode === 201) {

            message.success(res.message)
            form.resetFields()
            setIsModalOpen(false);
        }

        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange1 = (date, dateString) => {
        console.log(dateString);
        setDeliveyDate(dateString)

    };
    const onChange2 = (date, dateString) => {
        console.log(dateString);
        SetExpectedDateOfReceipt(dateString)

    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Cập Nhật
            </Button>
            <Modal title="Thông Tin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

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
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Người Giao"
                        name="deliver"
                        rules={[
                            {
                                required: true,
                                message: 'Điền Thông Tin!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày Giao"
                        name="deliveryDate"

                        rules={[
                            {
                                required: true,
                                message: 'Điền Thông Tin!',
                            },
                        ]}
                    >
                        <DatePicker value={deliveryDate} onChange={onChange1} />
                    </Form.Item>
                    <Form.Item
                        label="Dự Kiến"
                        name="expectedDateOfReceipt"
                        rules={[
                            {
                                required: true,
                                message: 'Điền Thông Tin!',
                            },
                        ]}
                    >
                        <DatePicker value={expectedDateOfReceipt} onChange={onChange2} />
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
                </Form>
            </Modal>
        </>
    );
};
export default UpdateOrder;