import { Card, Form, Input, Button, Checkbox } from "antd";
import React from "react";

const Settings = ({ user }) => {
  return (
    <>
      <h1>Настройки аккаунта {user.id}</h1>
      <Card title={"Профиль"} style={{ marginBottom: 20 }}>
        <Form name="basic" requiredMark={false}>
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Введите своё имя",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Введите свою фамилию!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Отчество" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={"Вход"}>TestTestTestTestTestTest</Card>
    </>
  );
};

export default Settings;
