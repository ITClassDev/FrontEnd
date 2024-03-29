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
import { config } from "../config";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../useDocumentTitle";

const CLIENT_VER = config.CLIENT_VER;
const { Text } = Typography;

export const Poll = () => {
  const [searchParams] = useSearchParams();
  const poll_id = searchParams.get("id").replace(/\/+$/, '');
  useDocumentTitle(`ШТП Опрос`);
  const [pollTitle, setPollTitle] = useState("Loading...");
  const [pollDescription, setPollDescription] = useState("Loading...");
  const [pollContent, setPollContent] = useState("Loading...");
  const [displaySubmit, setDisplaySubmit] = useState(true);

  let navigate = useNavigate();


  useEffect(() => {
    API({
      endpoint: `/polls/${poll_id}`, ok: (resp) => {
        
        setPollContent(<>
          {resp.data.entries.map((question, ind) => {
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
                res = <CheckboxSelect ind={ind} question={question} key={ind} />;
                break;
            }
            return res;
          })}
        </>)
        setPollTitle(resp.data.title);
        setPollDescription(resp.data.description);
      }, err: (resp) => {
        console.error("404"); // TODO; handle 404 page
        navigate("/404");
      }
    })
  }, []);

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
            onFinish={(data) => {
              API({
                endpoint: `/polls/${poll_id}/submit`, data: data, method: "put", ok: () => {
                  setDisplaySubmit(false);
                  setPollContent(<Card style={{ marginTop: 20, marginBottom: 20 }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>Ответы на опрос записаны</Text>
                    </Space>
                  </Card>
                  );
                }
              })
            }}
          >
            {pollContent}
            <Card style={displaySubmit ? { marginTop: 20, marginBottom: 20 } : { display: 'none' }}>
              <Space direction="vertical" style={{ width: "100%" }}>
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

