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

const QuestionBase = ({ ind, question, body }) => {
  return (
    <Card title="" style={{ marginTop: 40 }} key={ind}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>{question}</Text>
        <Form.Item name={`qustion_${ind}`}>{body}</Form.Item>
      </Space>
    </Card>
  );
};

const OneItemSelect = ({ ind, question }) => {
  return (
    <QuestionBase
      body={
        <Select style={{ width: "100%" }} options={question.variants}></Select>
      }
      ind={ind}
      question={question.text}
    />
  );
};

const OneLineText = ({ ind, question }) => {
  return (
    <QuestionBase
      body={
        <Select style={{ width: "100%" }} options={question.variants}></Select>
      }
      ind={ind}
      question={question.text}
    />
  );
};

const MultilineText = ({ ind, question }) => {};

const Poll = () => {
  const formSubmitHandler = (form_data) => {
    console.log(form_data);
  };
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
        <Form
          name="answers_page"
          autoComplete="off"
          requiredMark={false}
          onFinish={formSubmitHandler}
        >
          {questions.map((question, ind) => (
            <OneItemSelect ind={ind} question={question} />
          ))}
          <Card style={{ marginTop: 20 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox>
                Отправляя опрос, Вы отдаёте себя в рабство Путинцеву навсегда
              </Checkbox>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: 15 }}
              >
                Отправить
              </Button>
            </Space>
          </Card>
        </Form>
      </div>
    </Layout>
  );
};

export default Poll;
