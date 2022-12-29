import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, FieldStringOutlined } from "@ant-design/icons";

const CreateTaskCard = () => {
  return (
    <>
      <h1>Добавить задачу дня</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Введите заголовок",
            },
          ]}
        >
          <Input
            prefix={<FieldStringOutlined className="site-form-item-icon" />}
            placeholder="Название задачи (тайтл)"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль",
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot">Восстановить пароль</a>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTaskCard;
