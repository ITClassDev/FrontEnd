import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../api";

const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => { //Check login before
        if (localStorage.getItem("user")){
            axios.get(`${API_URL}/auth/me`, getAuth()).then((respose) => {
                if (respose.status === 200){ // Token valid
                    localStorage.setItem("user_id", respose.data.user.id);
                    navigate('/');
                } 
            });
        }
    });

    const onFinish = (values) => {
        axios.post(`${API_URL}/auth/login`, {"email": values["email"], "password": values["password"]}).then((response) => {
            if (response.status === 200){
              localStorage.setItem('user', response.data.accessToken); // Update access token in local storage; so security?! No!
              navigate('/');
            }
          });
    };

    return (
        <Form
            name="normal_login"
            style={{ width: "30%"}}
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
                        message: 'EMAIL!!!!!!!',
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
                        message: 'PASSWORD!!!!!!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot">
                    Забыл пароль
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
            </Form.Item>
        </Form>

    );
}

export default LoginPage;