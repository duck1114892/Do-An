import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import CartList from './cartList';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal } from '../redux/login/action';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    let dispath = useDispatch()
    let nagivate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataInit, setDataInit] = useState()
    const [dataCount, setDataCount] = useState()
    const handleData = (data) => {
        setDataInit(data.total)
        console.log('this data:', data.array.length)
        setDataCount(data.array.length)
        console.log(typeof dataInit)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        setIsModalOpen(false);
        dispath(getTotal(dataInit))
        nagivate('/cartPage')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handlePrice = (price) => {
        const numericPrice = Number(price); // Chuyển đổi sang kiểu số
        return numericPrice.toLocaleString('en-US');
    };

    return (
        <>

            <Button style={{ marginLeft: '6%', marginRight: '3%', cursor: 'pointer' }} type="primary" onClick={showModal} shape='circle' size='large'>
                <ShoppingCartOutlined />
            </Button>
            <Modal title="Giỏ Hàng" style={{ top: '20px', left: '400px' }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CartList props={isModalOpen} setData={handleData}></CartList>
                <div style={{ fontSize: "20px" }}>Tổng : <span style={{ fontSize: "20px", color: "red" }}>{handlePrice(dataInit)} VND</span></div>
            </Modal>


        </>
    );
};
export default Cart;