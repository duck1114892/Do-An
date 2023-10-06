import { Button, List, Modal, Statistic } from "antd";
import { useEffect, useState } from "react";
import { callDetailProduct } from "../../controller/api";

const DetailsExpress = () => {
    // Set initial state for data
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        total: 0,
        totalOrders: 0,
        totalOrdersCanceled: 0,
        totalProductsOrdered: 0,
    });
    const [arr, setArr] = useState()
    useEffect(() => {
        const callRes = async () => {
            try {
                const res = await callDetailProduct();
                setData(res);
                setArr(res.array)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        callRes();
    }, []);
    console.log(arr)
    return (
        <>
            <Statistic title="Doanh Thu" value={`${data.total},000 VND`} />
            <Statistic title="Tổng Số Đơn" value={data.totalOrders} />
            <Statistic title="Tổng Đơn Hủy" value={data.totalOrdersCanceled} />
            <Button type="" onClick={() => setOpen(true)}>
                <Statistic title="Tổng Số Lượng Bán Ra :" value={data.totalProductsOrdered} />
            </Button>
            <Modal
                title="Danh Sách"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <List
                    size="large"
                    bordered
                    dataSource={arr}

                    renderItem={(item) => (
                        <List.Item
                            actions={[

                            ]}
                        >

                            <List.Item.Meta

                                title={<a> {item.product_id} - {item.name} </a>}
                                description={<>Số Lượng: {item.cnt}</>}
                            />
                        </List.Item>
                    )}
                />
            </Modal>


        </>
    );
};

export default DetailsExpress;
