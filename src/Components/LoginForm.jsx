import React, { useState } from "react";
import { Button, message, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { authUser } from "../api";

const LoginForm = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [buttonLoading, setButtonLoading] = useState(false);
    const login_error = () => {
        messageApi.open({
            type: 'error',
            content: 'Неверная пара логин/пароль',
        });
        setButtonLoading(false);
    };
    const login_ok = (response) => {
        setButtonLoading(false);
        localStorage.setItem('user', response.data.accessToken); // Update access token in local storage; so security?! No!
        navigate(0);
    }

    const onFinish = (values) => {
        setButtonLoading(true);
        authUser(values.email, values.password, login_ok, login_error);
        /*axios.post(`${API_URL}/auth/login`, { "email": values["email"], "password": values["password"] }).then((response) => {
            
        }).catch((response) => {
            if (response.status === undefined){
                
            }else{
                setButtonLoading(false);
                error();
            }

        });*/
    };

    return (
        <>
            {contextHolder}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введите Email',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={buttonLoading}>
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot">
                        Восстановить пароль
                    </a>
                </Form.Item>
            </Form>
        </>

    );
}

export default LoginForm;