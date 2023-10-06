import React, { useState } from "react";
import { Button, Modal, Input, Form, InputNumber, Checkbox, message } from "antd";
import { callAddBook } from "../controller/api";
import { useForm } from "antd/es/form/Form";

const AddProduct = ({ props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const { id, name, price, description, amount, img_name, path, type } = values;
        console.log(values)
        const res = await callAddBook(id, name, price, description, amount, img_name, path, type);



        if (res.statusCode === 201) {
            handleCancel(false)
            message.success(res.message);
            props();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm Mới
            </Button>
            <Modal title="Thêm Sản Phẩm" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Id"
                        name="id"
                        rules={[{ required: true, message: "Please input your id!" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô Tả"
                        name="description"
                        rules={[{ required: true, message: "Please input your description!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: "Please input your price!" }]}
                    >
                        <InputNumber defaultValue={10000} min={1000} />
                    </Form.Item>
                    <Form.Item
                        label="Số Lượng"
                        name="amount"
                        rules={[{ required: true, message: "Please input your amount!" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Tên Ảnh"
                        name="img_name"
                        rules={[{ required: true, message: "Please input your img name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Link Ảnh"
                        name="path"
                        rules={[{ required: true, message: "Please input your path!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể Loại"
                        name="type"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Checkbox.Group>
                            <Checkbox value="1">Hành Động</Checkbox>
                            <Checkbox value="2">Kinh Dị</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddProduct;
