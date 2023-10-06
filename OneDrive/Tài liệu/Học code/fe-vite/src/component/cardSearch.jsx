import { ShoppingCartOutlined, TagsOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { callBook } from '../controller/api';
const { Meta } = Card;
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';



const CardSearch = (props) => {
    const handlePrice = (price) => {
        const numericPrice = Number(price); // Chuyển đổi sang kiểu số
        return numericPrice.toLocaleString('en-US');
    };
    return (

        <Card Card
            hoverable
            style={{
                marginTop: "20%",
                width: 290,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
            }}
            cover={
                < Link to={`/book-detail/${props.data.id}`}>
                    < img
                        style={{ height: "300px", width: "100%" }}
                        alt="example"
                        src={props.data.path}
                    />
                </ Link >
            }
            actions={
                [

                    <div style={{ color: "red", fontSize: "20px" }}>
                        <TagsOutlined />{handlePrice(props.data.price)},000 VND</div>

                ]}
        >
            <Meta
                style={{ height: "100px" }}
                title={props.data.name}
                description={<div style={{ minHeight: "20px" }}> {props.data.description}</div>}
            />
        </Card >

    )
}
    ;
export default CardSearch;