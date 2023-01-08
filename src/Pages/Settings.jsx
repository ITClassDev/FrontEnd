import { Card, Col, Row, Typography, Form, Input, Button, Image } from "antd";
import React from "react";
import Telegram_logo from "../Images/Telegram_logo.svg";
import Stepik_logo from "../Images/Stepik_logo.png";
import Kaggle_logo from "../Images/Kaggle_logo.svg";
import { GithubOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Settings = ({ user }) => {
  return (
    <>
      <Title level={3}>Настройки аккаунта {user.id}</Title>

      <Row gutter={[10, 10]}>
        <Col xs={24} xl={12}>
          <Card title={"Социальные ссылки"} style={{ height: "100%" }}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item name="github">
                <Input
                  addonBefore={<GithubOutlined />}
                  placeholder="github username"
                />
              </Form.Item>

              <Form.Item name="telegram">
                <Input
                  addonBefore={
                    <Image src={Telegram_logo} width={17} preview={false} />
                  }
                  placeholder="telegram username"
                />
              </Form.Item>

              <Form.Item name="stepik">
                <Input
                  addonBefore={
                    <Image src={Stepik_logo} width={17} preview={false} />
                  }
                  placeholder="stepik username"
                />
              </Form.Item>

              <Form.Item name="kaggle">
                <Input
                  addonBefore={
                    <Image src={Kaggle_logo} width={17} preview={false} />
                  }
                  placeholder="kaggle username"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title={"Вход и безопасность"} style={{ height: "100%" }}>
            <Text>TODO</Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
