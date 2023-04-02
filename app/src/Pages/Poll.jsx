import React, { useState } from "react";
import {
  Card,
  Layout,
  Button,
  Form,
  Typography,
  Space,
  Checkbox,
  theme,
  ConfigProvider,
  
} from "antd";
import { OneItemSelect, OneLineText, MultilineText, CheckboxSelect } from "../Components/Polls/PollsUI";
import "../poll.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../api";
import { CLIENT_VER } from "../config";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

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
  let navigate = useNavigate();


  useEffect(() => {
    API({
      endpoint: `/polls/${poll_id}`, ok: (resp) => {
        setQuestions(resp.data.entries);
        setPollTitle(resp.data.title);
        setPollDescription(resp.data.description);
      }, err: (resp) => {
        console.error("404"); // TODO; handle 404 page
        navigate("/404");
      }
    })
  }, [])
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
            <Text italic >ShTP-Polls Service 0.0.1 dev on ShTP {CLIENT_VER} base; loaded poll_id: {poll_id}</Text>
          </Form>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default Poll;
