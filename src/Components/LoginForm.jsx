import React, { useState } from "react";
import { Button, message, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

const LoginForm = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [buttonLoading, setButtonLoading] = useState(false);
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Неверная пара логин/пароль',
        });
    };

    const onFinish = (values) => {
        setButtonLoading(true);
        axios.post(`${API_URL}/auth/login`, { "email": values["email"], "password": values["password"] }).then((response) => {
            if (response.status === 200) {
                setButtonLoading(false);
                localStorage.setItem('user', response.data.accessToken); // Update access token in local storage; so security?! No!
                navigate(0);
            }
        }).catch(() => {
            setButtonLoading(false);
            error();

        });
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