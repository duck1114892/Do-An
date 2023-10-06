// import { Avatar, Button, List, Skeleton, Divider, Typography, message } from 'antd';
// import { useEffect, useState } from 'react';
// import { callDeleteCart, callGetCart } from '../controller/api';
// import { useSelector } from 'react-redux';


// const CartList = (props) => {
//     const username = useSelector(state => state.rootReducer.user.username)
//     const onScroll = (e) => {
//         if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
//             appendData();
//         }
//     };
//     const [deleteInit, setDeleteInit] = useState(1)
//     console.log(props)
//     useEffect(() => {
//         const cartList = async () => {
//             let res = await callGetCart(username)
//             console.log('this is data', res)

//             let arr = res.array
//             setData(arr.map((item) => {
//                 return item
//             }))
//             props.setData(res)
//         }
//         cartList()
//     }, [props, deleteInit])
//     const [data, setData] = useState([])
//     const handleDelete = async (id) => {
//         setDeleteInit(deleteInit + 1)
//         let resDelete = await callDeleteCart(id)
//         if (resDelete.statusCode === 201) {
//             message.success(resDelete.message)
//         }
//     }
//     return (
//         <>

//             <List
//                 size="large"
//                 onScroll={onScroll}
//                 bordered
//                 dataSource={data}
//                 renderItem={(item) => <List.Item actions={[<a key="list-loadmore-edit">Xem</a>, <a onClick={() => handleDelete(item.id)} key="list-loadmore-more">Delete</a>]}>
//                     <List.Item.Meta
//                         avatar={<Avatar src={`${item.img}`} />}
//                         title={<a>ID: {item.id}  {item.name} - Price :{item.price}.000VND </a>}
//                         description={item.quantity}
//                     />
//                 </List.Item>}
//             />

//         </>
//     );
// };
// export default CartList;
import { Avatar, Button, List, message } from 'antd';
import { useEffect, useState } from 'react';
import { callDeleteCart, callGetCart } from '../controller/api';
import { useSelector } from 'react-redux';

const CartList = (props) => {
    const username = useSelector(state => state.rootReducer.user.username);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteInit, setDeleteInit] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await callGetCart(username);
                setData(res.array);
                props.setData(res)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props, deleteInit]);

    const handleDelete = async (id) => {
        try {
            const resDelete = await callDeleteCart(id);
            if (resDelete.statusCode === 201) {
                message.success(resDelete.message);
                setData(prevData => prevData.filter(item => item.id !== id));
                setDeleteInit(deleteInit + 1)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handlePrice = (price) => {
        const numericPrice = Number(price); // Chuyển đổi sang kiểu số
        return numericPrice.toLocaleString('en-US');
    };
    return (
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
                    {



                    }
                    <List.Item.Meta
                        avatar={<Avatar src={`${item.img}`} />}
                        title={<a> {item.name} - Price :{handlePrice(item.price)} VND </a>}
                        description={<>Số Lượng: {item.quantity}</>}
                    />
                </List.Item>
            )}
        />
    );
};

export default CartList;
