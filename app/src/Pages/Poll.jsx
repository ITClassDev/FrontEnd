import React, { useState } from "react";
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
  theme,
  ConfigProvider,
  Image
} from "antd";
import "../poll.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../api";

const { Text } = Typography;
const { TextArea } = Input;

const QuestionBase = ({ ind, question, body }) => {
  return (
    <Card title={question.text} style={{ marginTop: 20 }} key={ind}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {"image" in question && <Image src={question.image} className="poll_image" />}
        {"description" in question && <Text>{question.description}</Text>}
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
      question={question}
    />
  );
};

const OneLineText = ({ ind, question }) => {
  return (
    <QuestionBase
      body={
        <Input
          style={{ width: "100%" }}
          placeholder="Введите свой ответ"
        ></Input>
      }
      ind={ind}
      question={question}
    />
  );
};

const MultilineText = ({ ind, question }) => {
  return (
    <QuestionBase
      body={
        <TextArea
          style={{ width: "100%" }}
          placeholder="Введите свой ответ"
        ></TextArea>
      }
      ind={ind}
      question={question}
    />
  );
};

const CheckboxSelect = ({ ind, question }) => {
  return (
    <QuestionBase
      body={<Checkbox.Group>
        <Space direction="vertical">
          {question.variants.map((el, index) => (
            <Checkbox value={el.value} key={index}><Text style={{ marginLeft: 5 }}>{el.label}</Text></Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
      }
      ind={ind}
      question={question}
    />
    /*
    {question.variants.map((el, index) => (
        <Row key={index}>
          <Checkbox value={el.value} />
          <Text style={{ marginLeft: 5 }}>{el.label}</Text>
        </Row>
      ))}
     */
  );
};

const Poll = () => {
  const [searchParams] = useSearchParams();
  const poll_id = searchParams.get("id");
  const [questions, setQuestions] = useState([]);
  const [pollTitle, setPollTitle] = useState("Loading...");
  const [pollDescription, setPollDescription] = useState("Loading...");

  // Handler
  const formSubmitHandler = (form_data) => {
    console.log(form_data);
  };
  // Static test; loaded from backend api
  // const questions = [
  //   {
  //     text: "Путинцев - это: ",
  //     type: 0,
  //     variants: [
  //       {
  //         value: "Скамер",
  //         label: "Скамер",
  //       },
  //       {
  //         value: "Рабовладелец",
  //         label: "Рабовладелец",
  //       },
  //       {
  //         value: "Предприимчивый",
  //         label: "Предприимчивый",
  //       },
  //     ],
  //   },
  //   {
  //     text: "Кратко опишите Путинцева",
  //     type: 1,
  //   },
  //   {
  //     text: "Просто мультилайн",
  //     type: 2,
  //   },
  //   {
  //     text: "Description",
  //     type: 2,
  //     description: "Extra information for this question"
  //   },
  //   {
  //     text: "Checkbox select",
  //     type: 3,
  //     variants: [
  //       { value: "Option", label: "Option" },
  //       { value: "Option 1", label: "Option 1" },
  //       { value: "Option 2", label: "Option 2" },
  //     ],
  //   },
  //   {
  //     image:
  //       "https://www.gentoo.org/assets/img/wallpaper/abducted/gentoo-abducted-1600x1200.png",
  //     text: "With image support",
  //     type: 1,
  //   },
  // ];
  
  useEffect(() => {
    API({
      endpoint: `/polls/${poll_id}`, ok: (resp) => {
        setQuestions(resp.data.entries);
        setPollTitle(resp.data.title);
        setPollDescription(resp.data.description);
      }, err: (resp) => {
        console.error("404");
      }
    })
  }, [])
  // useEffect(() => {
  //   console.log(String.raw`
  //   ██████╗░██╗░░░██╗████████╗██╗███╗░░██╗░█████╗░███████╗██╗░░░██╗
  //   ██╔══██╗██║░░░██║╚══██╔══╝██║████╗░██║██╔══██╗██╔════╝██║░░░██║
  //   ██████╔╝██║░░░██║░░░██║░░░██║██╔██╗██║██║░░╚═╝█████╗░░╚██╗░██╔╝
  //   ██╔═══╝░██║░░░██║░░░██║░░░██║██║╚████║██║░░██╗██╔══╝░░░╚████╔╝░
  //   ██║░░░░░╚██████╔╝░░░██║░░░██║██║░╚███║╚█████╔╝███████╗░░╚██╔╝░░
  //   ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚════╝░╚══════╝░░░╚═╝░░░`);
  // }, []);
  return (
    <ConfigProvider theme={{
      algorithm: false
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
    }}>
      <Layout>
        <div className="wrapper">
          <Card title={pollTitle}>{pollDescription}</Card>
          <Form
            name="answers_page"
            autoComplete="off"
            requiredMark={false}
            onFinish={formSubmitHandler}
          >
            {questions.map((question, ind) => {
              let res;
              switch (question.type) {
                case 0:
                  res = <OneItemSelect ind={ind} question={question} key={ind} />;
                  break;
                case 1:
                  res = <OneLineText ind={ind} question={question} key={ind} />;
                  break;
                case 2:
                  res = <MultilineText ind={ind} question={question} key={ind} />;
                  break;
                case 3:
                  res = (
                    <CheckboxSelect ind={ind} question={question} key={ind} />
                  );
                  break;
              }
              return res;
            })}
            <Card style={{ marginTop: 20, marginBottom: 20 }}>
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
            <Text italic >ShTP-Polls Service</Text>
          </Form>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default Poll;
