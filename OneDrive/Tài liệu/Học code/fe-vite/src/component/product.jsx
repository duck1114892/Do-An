import { useEffect, useState } from "react";
import { callBook } from "../controller/api";
import { Avatar, List } from "antd";
import DeleteProduct from "./editProduct";
import AddProduct from "./addProduct";

const Product = () => {
    const [changeData, setChangeData] = useState(false);
    const [changeDelete, setChangeDelete] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callBook();
            setData(res.array);
        };
        fetchData();
    }, [changeData, changeDelete]);

    const handleChange = () => {
        setChangeData(!changeData);
    };

    const handleChangeDelete = () => {
        setChangeDelete(!changeDelete);
    };

    return (
        <>
            <AddProduct props={handleChange} />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <DeleteProduct
                                productId={item.id}
                                change={handleChangeDelete}
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.path} />}
                            title={<a href={`http://localhost:3000/book-detail/${item.id}`}>{item.name} - <span style={{ color: "red" }}>{item.amount} Sản Phẩm</span></a>}
                            description={<div>{item.description}</div>}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default Product;
