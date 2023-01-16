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
import { submitContest } from "../api";
const { Text } = Typography;

const SubmitViaGithub = ({ contest_id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const submitFormHandler = (form_data) => {
    submitContest(
      contest_id,
      form_data.language,
      `https://github.com/${form_data.github_repo}`,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Контест отправлен на проверку!",
        });
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Произошла ошибка при отправке контеста!",
        });
      }
    );
  };

  return (
    <>
      {contextHolder}
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
                  label: "C++",
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
