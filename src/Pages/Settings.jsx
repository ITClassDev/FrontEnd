import { Card, Form, Input, Button, Row, Space } from "antd";
import React from "react";

const Settings = ({ user }) => {
  return (
    <>
      <h1>Настройки аккаунта {user.id}</h1>
      <Row>
          <Card
            title={"Профиль (а нахуя это??????)"}
            style={{ marginBottom: 20, marginRight: 20 }}
          >
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
        
        <Card title={"Социальные привязки"} style={{ marginBottom: 20 }}>
          <Space direction="vertical">
            <div>TG</div>
            <div>GitHub</div>
            <div>Stepik</div>
            <div>Kaggle</div>
          </Space>
        </Card>
      </Row>
      <Card title={"Вход и безопасность"} style={{ marginBottom: 20 }}>
        Placeholder
      </Card>

      <Card title={"TODO"} style={{ marginBottom: 20 }}>
        Change password; Change social links; change description of profile
      </Card>
    </>
  );
};

export default Settings;
