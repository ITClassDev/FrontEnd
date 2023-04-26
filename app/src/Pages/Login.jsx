import React from "react";
import "./Login.css"
import { Form, Button, Input, Checkbox, message } from 'antd';
import { API } from "../api";

export const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();    
    return (
        <>
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
                                    localStorage.setItem('user', response.data.accessToken);
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

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Эта галочка ничего не делает</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                ВОЙТИ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

