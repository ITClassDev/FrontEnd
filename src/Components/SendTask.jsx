import React, { useState } from "react";
import { message, Upload, Button, Card, Tabs } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import { submitDayChallenge } from "../api";
import CodeEditor from "@uiw/react-textarea-code-editor";

const { Dragger } = Upload;

const SendTask = ({ task_id, getSubmissions }) => {
  const [fileToSend, SetFileToSend] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const props = {
    name: "file",
    multiple: false,
    accept: ".cpp, .py",
    fileList: fileToSend,
    onRemove: (file) => {
      SetFileToSend([]);
      return [];
    },
    beforeUpload: (file) => {
      SetFileToSend([file]);
      return false;
    },
    fileToSend,
  };

  const SendTaskHandler = () => {
    submitDayChallenge(
      fileToSend[0],
      (response) => {
        getSubmissions();
        messageApi.open({
          type: "success",
          content: "Задача отправлена на проверку!",
        });
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Произошла ошибка при отправке файла! Проверьте расширение!",
        });
      }
    );
  };

  const tabsItems = [
    {
      key: 1,
      label: "Загрузить файл",
      children: (
        <>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <CodeOutlined />
            </p>
            <p className="ant-upload-text">
              Кликните или перетащите файл для загрузки
            </p>
            <p className="ant-upload-hint">
              Загрузить можно только 1 файл с исходным кодом. Язык для
              выполнения определяется по расширению.
            </p>
          </Dragger>
          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={SendTaskHandler}
            disabled={!fileToSend}
          >
            Отправить на проверку
          </Button>
        </>
      ),
    },
    {
      key: 2,
      label: "Набрать здесь",
      children: (
        <>
          <CodeEditor
            value={code}
            language="python"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
          <Button type="primary" block style={{ marginTop: 20 }}>
            Отправить на проверку
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Card title="Сдать задачу" style={{ marginBottom: 20 }}>
        <Tabs defaultActiveKey="1" items={tabsItems} />
      </Card>
    </>
  );
};
export default SendTask;
