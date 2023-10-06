import { Button, Checkbox, Form, Input, message } from 'antd';
import './signUpPage.scss'
import { callSignUp } from '../controller/api';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    let navigate = useNavigate()
    const onFinish = async (values) => {
        let { username, password, phone, email } = values
        let res = await callSignUp(username, password, email, phone)
        if (res && res.statusCode === 201) {

            message.open({
                type: 'success',
                content: `${res.message}`,
            });
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='signUp-body'>
            <div className='signUp-container'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        width: "400px"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ marginTop: "10px" }}
                        wrapperCol={{
                            offset: 8,
                            span: 24,
                        }}>
                        <div style={{ fontSize: "40px" }}>Đăng Ký</div>
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input style={{ height: "50px", fontSize: "20px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input style={{ height: "50px", fontSize: "20px" }} />
                    </Form.Item>
                    <Form.Item
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
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button style={{}} type="primary" htmlType="submit">
                            Đăng Ký
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <div style={{ fontSize: "16px" }}>Bạn Đã Có Tài Khoản ? -   <a href='/login'>Đăng Nhập</a></div>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}
export default SignUpPage;