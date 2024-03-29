import React, { useState } from "react";
import { message, Upload, Button, Card, Tabs, Select } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import { API } from "../api";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { singleTaskSubmitHelp } from "./HelpModals";

const { Dragger } = Upload;

const SendTask = ({ task_id, getSubmissions, isDarkTheme }) => {
  const [fileToSend, SetFileToSend] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [code, setCode] = useState(``);
  const [progLang, setProgLang] = useState("cpp");
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
    API({
      endpoint: "/assigments/tasks/challenge/submit", method: "post", files: { "source": fileToSend[0] }, ok: (resp) => {
        getSubmissions();
        messageApi.open({
          type: "success",
          content: "Задача отправлена на проверку!",
        });
      }, err: (resp) => {
        messageApi.open({
          type: "error",
          content: "Произошла ошибка при отправке файла! Проверьте расширение!",
        });
      }
    });
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
          <Select
            value={progLang}
            onChange={(lang) => {
              setProgLang(lang);
            }}
            style={{
              width: 120,
              marginBottom: 20,
            }}
            options={[
              {
                value: "cpp",
                label: "C++",
              },
              {
                value: "py",
                label: "Python 3.10",
              }
            ]}
          />
          <CodeEditor
            value={code}
            language={progLang}
            placeholder="Введите код"
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            data-color-mode={
              localStorage.getItem("isDarkMode") === "true" ? "dark" : "light"
            }
            style={{
              fontSize: 12,
              backgroundColor:
                localStorage.getItem("isDarkMode") === "true"
                  ? "black"
                  : "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={() => {
              if (code.length) {
                API({
                  endpoint: "/assigments/tasks/challenge/submit", method: "post", files: { "source": new File([new Blob([code])], `main.${progLang}`) }, ok: (resp) => {
                    getSubmissions();
                  }, message: { show: 1, api: messageApi, ok: "Задача отправлена на проверку!", err: "Произошла ошибка при отправке файла! Проверьте расширение!" }
                });
              }
            }}
          >
            Отправить на проверку
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Card title="Сдать задачу" style={{ marginBottom: 20 }} extra={<a onClick={() => { singleTaskSubmitHelp() }}>Помощь</a>}>
        <Tabs defaultActiveKey="1" items={tabsItems} />
      </Card>
    </>
  );
};
export default SendTask;
