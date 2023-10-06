import { BarsOutlined, DownOutlined, IdcardOutlined, ImportOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from '../redux/login/loginStore';
import { Link, useNavigate } from 'react-router-dom';
import { callLogOut } from '../controller/api';
import { logoutredux } from '../redux/login/action';
import { useEffect } from 'react';


const UserDrop = () => {
    let navigate = useNavigate()
    let dispath = useDispatch()

    const handleClick = async () => {
        const logout = await callLogOut()
        navigate('/book')
        dispath(logoutredux())
        console.log(logout)
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('role')
    }
    const handleChange = () => {
        navigate('/userpage/userdetail')
    }
    const items = [
        {
            key: '1',
            label: (
                <div onClick={handleChange}>Quản Lý Tài Khoản</div>
            ),
            icon: <IdcardOutlined />
        },
        {
            key: '2',
            label: (
                <a onClick={handleClick}>Đăng Xuất</a>
            ),
            icon: <ImportOutlined />,
            disabled: false,
        }
    ];

    if (localStorage.getItem('role') == 1) {
        items.splice(1, 0, {
            key: '3',
            label: (
                <a href='/admin/crud'>Admin Page</a>
            ),
            icon: <BarsOutlined />
        });
    }

    const isLogin = useSelector(state => state.rootReducer.isLogin)
    const userName = useSelector(state => state.rootReducer.user.username)


    return (
        <>
            {isLogin ?
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space style={{ color: 'white', fontWeight: '600', WebkitTextStroke: '0.2px black', fontSize: '15px', cursor: "pointer" }}>
                            {userName}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown> : <Link style={{ color: "white" }} to='/login'>Đăng Nhập</Link>}
        </>

    );
}
export default UserDrop;