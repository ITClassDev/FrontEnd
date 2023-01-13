import React, { useState } from "react";
import { message, Upload, Button, Card } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import { submitDayChallenge } from "../api";
const { Dragger } = Upload;

const SendTask = ({ task_id, getSubmissions }) => {
  const [fileToSend, SetFileToSend] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const props = {
    name: "file",
    multiple: false,
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

  return (
    <>
      {contextHolder}
      <Card title="Сдать задачу" style={{ marginBottom: 20 }}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <CodeOutlined />
          </p>
          <p className="ant-upload-text">
            Кликните или перетащите файл для загрузки
          </p>
          <p className="ant-upload-hint">
            Загрузить можно только 1 файл с исходным кодом. Язык для выполнения
            определяется по расширению.
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
      </Card>
    </>
  );
};
export default SendTask;
