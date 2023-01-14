import React from "react";
import { GithubOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Alert, Space, Typography } from "antd";
import { submitContest } from "../api";
const { Text } = Typography;

const SubmitViaGithub = ({contest_id}) => {

  const submitFormHandler = (form_data) => {
    submitContest(contest_id, form_data.github_repo, (response) => {
      console.log(response);
    }, () => {});
  }
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
         
        </Space>
        type="info"
      />
      <Form name="basic" autoComplete="off" requiredMark={false} onFinish={submitFormHandler}>
        <Form.Item
          name="github_repo"
          rules={[
            {
              required: true,
              message: "Link to GitHub repo",
            },
          ]}
        >
          <Input
            addonBefore="github.com/"
            placeholder="username/repo_name"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginTop: 5}}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SubmitViaGithub;
