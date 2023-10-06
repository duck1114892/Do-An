import { Button, Image, InputNumber, message } from "antd";
import './BookDetail.scss';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callAddCart, callBook, callBookDetails } from "../controller/api";
import { ShoppingCartOutlined } from "@ant-design/icons";
import BuyBtn from "./BuyBtn";
import { useSelector } from "react-redux";
let prices = ''

const BookDetail = () => {
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const onChange = (value) => {
        setPriceInit(prices * value)
        setQuantity(value)
    };
    let isLogin = useSelector(state => state.rootReducer.isLogin)

    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    let [priceInit, setPriceInit] = useState()
    let [quantityInit, setQuantity] = useState(1)
    let [category, setCategory] = useState()
    let [productId, setProductID] = useState()
    let [imgLink, setImgLink] = useState()
    let [name, setName] = useState()
    let [userNameState, setUserNameState] = useState()
    let [emailState, setEmailState] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const res = await callBookDetails(id);
            setCategory(res.nameType)
            setBookDetails(res);
            setPriceInit(res.price)
            prices = res.price
            setProductID(res.id)
            setImgLink(res.path)
            setName(res.name)
            setUserNameState(username)
            setEmailState(email)
        };

        fetchData();
    }, [id]);

    if (!bookDetails) {
        return null; // Chờ dữ liệu được tải về
    }

    const handleAddCart = async () => {
        console.log(userNameState, emailState, name, productId, priceInit, imgLink, quantityInit, category)
        const resAddCart = await callAddCart(userNameState, email, name, productId, priceInit, imgLink, quantityInit, category)
        if (resAddCart.statusCode === 201) {
            message.success(resAddCart.message)
        }
        if (resAddCart.statusCode === 301) {
            message.warning(resAddCart.message)
        }
    }
    const noLogin = () => {
        message.error('Bạn Cần Phải Đăng Nhập')
    }
    const handlePrice = (price) => {
        const numericPrice = Number(price);
        return numericPrice.toLocaleString('en-US');
    };
    return (
        <div className="book-detail">
            <div className="detail-item-1">
                <Image
                    width={300}
                    height={400}
                    style={{ overflow: 'hidden', boxShadow: "  rgb(38, 57, 77) 0px 20px 30px -10px" }}
                    src={imgLink}
                />
                <div className="container-text">
                    <div className="name-book">{bookDetails.name}</div>
                    <div className="description">{bookDetails.description}</div>
                    <div style={{ marginTop: "5%", fontSize: "20px", fontWeight: 600 }}>Thể Loại :</div>
                    <div className="category">{category}</div>
                    <div className="detail-item-2">
                        <div style={{ marginTop: "5%" }}>
                            <div style={{ marginBottom: "2px" }}>Số Lượng :</div>
                            <InputNumber style={{ width: "70px" }} min={1} max={30} defaultValue={1} size="large" onChange={onChange} />
                        </div>
                        <div className="price">{handlePrice(priceInit)} VND</div>
                        {/* <Button style={{ marginTop: "2%", height: "50px", width: "200px" }} size="large" type="primary">BUY</Button> */}

                        <BuyBtn props={quantityInit} propsPrice={handlePrice(priceInit)} propsType={category} propsProductId={productId}></BuyBtn>

                        <Button onClick={isLogin ? handleAddCart : noLogin} style={{ marginLeft: "3%", marginTop: "2%", height: "50px", width: "200px" }} size="large" danger><ShoppingCartOutlined style={{ fontSize: "20px" }} /></Button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default BookDetail;
