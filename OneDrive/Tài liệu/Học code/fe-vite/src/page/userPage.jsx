import React, { useState } from 'react';
import {
    AppstoreOutlined,
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    HomeTwoTone,
    PieChartOutlined,
    ShoppingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import UserDrop from '../component/user';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    {
        label: <Link to='/userpage/userdetail'>Người Dùng</Link>,
        key: 'userdetails',
        icon: <AppstoreOutlined />

    },
    {
        label: <Link to='/userpage/order'>Đơn Hàng </Link>,
        key: 'order',
        icon: <ShoppingOutlined />

    },
    {
        label: <Link to='/userpage/expressing'>Đang Giao</Link>,
        key: 'express',
        icon: <ShoppingOutlined />

    },
];
const UserPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <div style={{ backgroundColor: "black", height: "60px", position: "relative", }}>
                <a href="/book" style={{ color: "white", fontSize: "30px", textDecoration: "none", fontFamily: "monospace", position: "absolute", top: "10px", left: "15px" }}> <HomeTwoTone /></a>
                <div style={{ position: "absolute", right: "30px", top: "10px" }}><UserDrop></UserDrop></div>
            </div>
            <Layout
                style={{
                    minHeight: '90vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 12,
                                minHeight: 340,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>

                </Layout>
            </Layout></>

    );
};
export default UserPage;