import React from "react";
import { message, Upload, Button, Card } from "antd";
import { CodeOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} выбран и загружен.`);
    } else if (status === "error") {
      message.error(`${info.file.name} ошибка при загрузке.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const SendTask = ({ task_id }) => {
  return (
    <Card title="Сдать задачу" style={{ marginBottom: 20 }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <CodeOutlined />
        </p>
        <p className="ant-upload-text">
          Кликните или перетащите файл для загрузки
        </p>
        <p className="ant-upload-hint">
          Язык определяется автоматически по расширению файла. Если задача
          требует хэдер, то вы можете загрузить его вместе с главным кодом.
        </p>
      </Dragger>
      <Button type="primary" block style={{ marginTop: 20 }}>
        Отправить на проверку!
      </Button>
    </Card>
  );
};
export default SendTask;
