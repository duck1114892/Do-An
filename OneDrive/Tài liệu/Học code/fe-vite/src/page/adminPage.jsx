import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    CarOutlined,
    CheckOutlined,
    DesktopOutlined,
    FileOutlined,
    ImportOutlined,
    PieChartOutlined,
    ShoppingOutlined,
    SmallDashOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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

        label: <Link to='/admin/crud'>Tài Khoản</Link>,
        key: 'crud',
        icon: <AppstoreOutlined />

    },
    {

        label: <Link to='/admin/product'>Product</Link>,
        key: 'product',
        icon: <ShoppingOutlined />

    },
    {

        label: <Link to='/admin/confirm'>Xác Nhận</Link>,
        key: 'confirm',
        icon: <CheckOutlined />

    },
    {

        label: <Link to='/admin/expressing'>Đang Giao</Link>,
        key: 'expreesing',
        icon: <CarOutlined />

    },
    {

        label: <Link to='/admin/detail'>Chi Tiết</Link>,
        key: 'detail',
        icon: <SmallDashOutlined />
    },
]
const App = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('role') == 1;
    console.log('ldada :', isAdmin)
    useEffect(() => {
        if (!isAdmin || window.location.pathname === '/admin') {
            console.log('lmao')
            navigate('/book');
        }
    }, [isAdmin, navigate]);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <div className='header-admin'></div>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div className="demo-logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
                        <a href='/book' style={{ color: "whitex", fontSize: "30px" }}><ImportOutlined /></a>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >

                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </>

    );
};
export default App;