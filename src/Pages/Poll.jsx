import React from "react";
import {
  Card,
  Layout,
  Button,
  Select,
  Form,
  Input,
  Typography,
  Space,
  Checkbox,
} from "antd";
import "../poll.css";

const { Text } = Typography;

const Poll = () => {
  // Handler
  const formSubmitHandler = (form_data) => {
    console.log(form_data);
  };
  // Static test; loaded from backend api
  const questions = [
    {
      text: "Путинцев - это: ",
      type: 0,
      variants: [
        {
          value: "Скамер",
          label: "Скамер",
        },
        {
          value: "Рабовладелец",
          label: "Рабовладелец",
        },
        {
          value: "Предприимчивый",
          label: "Предприимчивый",
        },
      ],
    },
  ];
  return (
    <Layout>
      <div className="wrapper">
        <Card title="Опрос от Путинцева">Этот опрос составил Путинцев</Card>
        <Form name="answers_page" autoComplete="off" requiredMark={false} onFinish={formSubmitHandler}>
          {questions.map((question, ind) => (
            <Card title="" style={{ marginTop: 40 }} key={ind}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>{question.text}</Text>
                <Form.Item
                  name="putincev"
                >
                  <Select
                    style={{ width: "100%" }}
                    options={question.variants}
                  ></Select>
                </Form.Item>
              </Space>
            </Card>
          ))}
          <Card style={{ marginTop: 20 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox>
                Отправляя опрос, Вы отдаёте себя в рабство Путинцеву навсегда
              </Checkbox>
              <Button type="primary" htmlType="submit">Отправить</Button>
            </Space>
          </Card>
        </Form>
      </div>
    </Layout>
  );
};

export default Poll;
