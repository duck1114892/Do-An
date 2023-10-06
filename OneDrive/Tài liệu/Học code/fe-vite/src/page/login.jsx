import { Button, Checkbox, Form, Input, message } from 'antd';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../controller/api';
import { useDispatch } from 'react-redux';
import { checkUser } from '../redux/login/action';

const LoginPage = () => {
    var navigate = useNavigate()
    var dispath = useDispatch()
    const onFinish = async (values) => {

        let res = await callLogin(values.username, values.password)
        if (res.statusCode === 201) {
            localStorage.setItem('access_token', res.data.access_token)
            dispath(checkUser(res.data.user))
            message.open({
                type: 'success',
                content: `${res.message}`,
            });
            setTimeout(() => {
                navigate('/book')
            }, 2000)
        }
        else {
            message.open({
                type: 'error',
                content: `${res.message}`,
            });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login-body'>
            <div className='login-container'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 34,
                    }}
                    style={{

                        minWidth: "420px"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelAlign="top"
                >
                    <Form.Item
                        style={{ marginTop: "10px" }}
                        wrapperCol={{
                            offset: 7,
                            span: 24,
                        }}>
                        <div style={{ fontSize: "35px" }}>Đăng Nhập</div>
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input style={{ height: "50px", fontSize: "20px" }} />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: "100px" }}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ height: "50px", fontSize: "20px" }} />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: "100px" }}
                        wrapperCol={{
                            offset: 9,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <div style={{ fontSize: "16px" }}>Bạn Chưa Có Tài Khoản ? - <a href="signup">Đăng Ký</a></div>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
};
export default LoginPage;