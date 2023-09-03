import React from "react";
import { GithubOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Space,
  Typography,
  Select,
  message,
} from "antd";
import { API } from "../api";
const { Text } = Typography;

const SubmitViaGithub = ({ contest_id, contestDescription }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const submitFormHandler = (form_data) => {
    API({
      endpoint: "/assigments/contests/submit", method: "post", data: {
        contest: contest_id,
        githubLink: `https://github.com/${form_data.github_repo}`,
        language: form_data.language
      }, message: { show: true, api: messageApi, ok: "Отправлено на проверку!", err: "Произошла ошибка при отправке контеста!" }
    });
  };

  return (
    <>
      {contextHolder}
      <Card
        title="Описание"
        style={{ marginBottom: 20 }}
      >
        <Text>{contestDescription}</Text>
      </Card>
      <Card
        title={
          <>
            <GithubOutlined /> Сдать через GitHub
          </>
        }
        style={{ marginBottom: 20 }}
      >
        <Alert
          showIcon
          style={{ marginBottom: 20 }}
          message="Убедитесь, что:"
          description={
            <Space direction="vertical">
              <Text>Вы запушили последние изменения в коде</Text>
              <Text>Файлы задачи находятся в корне репозитория</Text>
              <Text>Репозиторий открытый</Text>
              <Text>
                Название header файла: <Text code>str_easy.h</Text>
              </Text>
            </Space>
          }
          type="info"
        />
        <Form
          name="basic"
          autoComplete="on"
          requiredMark={false}
          onFinish={submitFormHandler}
        >
          <Form.Item
            name="github_repo"
            rules={[
              {
                required: true,
                message: "Link to GitHub repo",
              },
            ]}
          >
            <Input addonBefore="github.com/" placeholder="username/repo_name" />
          </Form.Item>
          <Form.Item name="language">
            <Select
              options={[
                {
                  value: "py",
                  label: "Python 3.10",
                },
                {
                  value: "cpp",
                  label: "C++ | GCC 10.2.1",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: 5 }}>
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SubmitViaGithub;
