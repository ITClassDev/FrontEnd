import React, { useEffect, useState } from "react";
import { convertDate, API } from "../api";
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
import { config } from "../config";

const STORAGE = config.STORAGE;

const { TextArea } = Input;
const { Text } = Typography;

const AddAchivment = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState([]);
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
      title: "Отправлено",
      dataIndex: "sent_time",
      key: "sent_time",
      render: (_, record) => (
        convertDate(record.sent_time)
      )
    },
    {
      title: "Документ",
      dataIndex: "document",
      key: "document",
      render: (_, record) => (
        <Button type="primary" href={`${STORAGE}/achievements/${record.document}`} target="__blank">Открыть</Button>
      )
    }
  ];
  const [achievementQueueData, SetAchievementQueueData] = useState([]);
  const onAddAchivment = (achievement) => {
    API({
      endpoint: "/achievements", method: "put", data: {
        achievement: {
          eventType: achievement.type,
          title: achievement.title,
          description: achievement.description
        }
      },
      files: { "confirmFile": achievement.file.file },
      message: { show: true, api: messageApi, ok: "Достижение добавлено в очередь. Ожидайте модерации.", err: "Ошибка при добавлении достижения" },
      ok: (response) => {
        SetAchievementQueueData(prevState => [{
          id: response.data.uuid,
          key: response.data.uuid,
          title: response.data.title,
          sent_time: response.data.created_at,
          document: response.data.attachmentName
        }, ...prevState]);
      }
    });
  }

  const onFinishFailed = () => {
    messageApi.open({
      type: "error",
      content: "Error in validating form",
    });
  };
  const uploader_conf = {
    name: "file",
    listType: "text",
    fileList: file,
    multiple: false,
    maxCount: 1,
    onRemove: () => { },
    beforeUpload: (file) => {
      setFile([file]);
      return false;
    },
  };

  useEffect(() => {
    API({
      endpoint: "/achievements/pending", ok: (resp) => {
        SetAchievementQueueData(resp.data.map(achiv => ({
          id: achiv.uuid,
          key: achiv.uuid,
          title: achiv.title,
          sent_time: achiv.created_at,
          document: achiv.attachmentName
        })));

      }
    });
  }, []);
  return (
    <>
      {contextHolder}
      <Form
        name="add_achivment"
        onFinish={onAddAchivment}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
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
          name="type"
          rules={[
            {
              required: true,
              message: "Выберите категорию достижения",
            },
          ]}
        >
          <Select>
            <Select.Option value={"olimpiad"}>Олимпиады/конкурсы</Select.Option>
            <Select.Option value={"event"}>Мероприятия</Select.Option>
          </Select>
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
          name="file"
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
          Количество баллов за данное достижение выбирает преподаватель!
        </Text>
      </Form>
      <h1>На модерации</h1>
      <Table columns={columns_queue_table} dataSource={achievementQueueData} />
    </>
  );
};

export default AddAchivment;
