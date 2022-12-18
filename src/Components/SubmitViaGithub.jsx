import React from "react";
import { GithubOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Alert, Space, Typography } from "antd";
const { Text } = Typography;

const SubmitViaGithub = () => {
  return (
    <Card
      title={
        <>
          <GithubOutlined /> Сдать через GitHub
        </>
      }
      style={{ marginBottom: 20 }}
    >
      <Alert
        style={{ marginBottom: 20 }}
        showIcon
        message="Убедитесь, что:"
        description=<Space direction="vertical">
          <Text>Файлы задачи находятся в корне репозитория</Text>
          <Text>Репозиторий открытый</Text>
          <Text>
            Название header файла: <Text code>str_easy.h</Text>
          </Text>
          <Text type="secondary">
            Вы передаёте авторские права нам, и мы продадим ваш код майкрософту
            (чтобы не только код индусов у них был)
          </Text>
        </Space>
        type="info"
      />
      <Form name="basic" autoComplete="off">
        <Form.Item
          label="Link to repo"
          name="github_repo"
          rules={[
            {
              required: true,
              message: "Link to GitHub repo",
            },
          ]}
        >
          <Input
            addonBefore="https://github.com/"
            placeholder="username/repo_name"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SubmitViaGithub;
