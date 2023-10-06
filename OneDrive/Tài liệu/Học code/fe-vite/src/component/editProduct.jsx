import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { callDeleteBook } from "../controller/api";

const DeleteProduct = ({ productId, change }) => {
    const handleDelete = async () => {
        const res = await callDeleteBook(productId);
        if (res.statusCode === 201) {
            message.success(res.message);
            change();
        }
    };

    const handleCancel = (e) => {
        console.log(e);
        message.error("Click on No");
    };

    return (
        <Popconfirm
            title="Delete the task"
            description="Bạn Có Muốn Xóa ?"
            onConfirm={handleDelete}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>
                <DeleteOutlined />
            </Button>
        </Popconfirm>
    );
};

export default DeleteProduct;
