import React from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Select,
  Typography,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Text } = Typography;

const uploader_conf = {
  name: "confirmation_file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  multiple: false,
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AddAchivment = () => {
  const columns_queue_table = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
  ];
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="add_achivment"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[
            {
              required: true,
              message: "Введите заголовок",
            },
          ]}
        >
          <Input placeholder="Победа на Google Summer of Code " />
        </Form.Item>

        <Form.Item
          label="Категория"
          name="category"
          rules={[
            {
              required: true,
              message: "Выберите категорию",
            },
          ]}
        >
          <Select
            defaultValue="olimp"
            options={[
              {
                value: "olimp",
                label: "Олимпиада/Конкурс",
              },
              {
                value: "event",
                label: "Мероприятие",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[
            {
              required: true,
              message:
                "Введите описание конкурса и выполненной задачи или мероприятия",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Написал Unix совместимое ядро с кастомным uefi бутлоадером за 3 часа с нуля"
          />
        </Form.Item>

        <Form.Item
          label="Подтверждение"
          name="confirmation_file"
          rules={[
            {
              required: true,
              message: "Загрузите файл с подтверждением результата",
            },
          ]}
        >
          <Upload {...uploader_conf}>
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить на модерацию
          </Button>
        </Form.Item>
        <Text type="secondary">
          Количество баллов за данное достижение выбирает преподаватель! Но есть
          таблица рекомендуемых баллов за достижения из разных категорий.
        </Text>
      </Form>
      <h1>Ваши достижения на модерации</h1>
      <Table columns={columns_queue_table} />
    </>
  );
};

export default AddAchivment;
