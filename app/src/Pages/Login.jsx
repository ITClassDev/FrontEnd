import React, { useState, useEffect } from "react";
import "./Login.css"
import { Form, Button, Input, Checkbox, message, ConfigProvider, theme } from 'antd';
import { API } from "../api";


export const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("isDarkMode") === "true"
    );
    useEffect(() => {
        API({ endpoint: '/auth/me', ok: () => window.location.replace('/') })
    }, [])
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
            }}
        >
            {contextHolder}
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img src="../Landing/login_image.jpg" alt="Login" />
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={(creds) => {
                            API({
                                endpoint: '/auth/login', method: 'post', data: creds, ok: (response) => {
                                    localStorage.setItem('userAccessToken', response.data.accessToken);
                                    localStorage.setItem('userRefreshToken', response.data.refreshToken);
                                    window.location.replace('/');
                                }, message: { show: true, api: messageApi, ok: 'Вход успешно выполнен!', err: 'Ошибка' }
                            })
                        }}
                    >
                        <p className="form-title">Добро пожаловать</p>
                        <p>Вход в ShTP</p>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Введите свою почту!' }]}
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Введите свой пароль!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                ВОЙТИ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    )
}

