import React, { useEffect, useState } from "react";
import { addAchivment, convertDate, getAchivmentsQueue } from "../api";
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
    },
  ];
  const [achievementQueueData, SetAchievementQueueData] = useState();
  const onAddAchivment = (values) => {
    addAchivment(values, (resp) => {
        messageApi.open({
            type: "success",
            content: "Достижение добавлено в очередь. Ожидайте модерации.",
        })
    }, () => {});
  };
  const onFinishFailed = () => {
    messageApi.open({
      type: "error",
      content: "Error in validating form",
    });
  };
  const uploader_conf = {
    name: "confirmation_file",
    listType: "text",
    fileList: file,
    multiple: false,
    maxCount: 1,
    onRemove: () => {},
    beforeUpload: (file) => {
      setFile([file]);
      return false;
    },
  };

  useEffect(() => {
    getAchivmentsQueue(
      (resp) => {
        let res = [];
        resp.data.forEach((element) => {
          res.push({
            id: element.id,
            key: element.id,
            title: element.title,
            sent_time: convertDate(element.received_at),
          });
        });
        SetAchievementQueueData(res);
      },
      () => {}
    );
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
            <Select.Option value={0}>Олимпиады/конкурсы</Select.Option>
            <Select.Option value={1}>Мероприятия</Select.Option>
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
          Количество баллов за данное достижение выбирает модератор! Но есть
          таблица рекомендуемых баллов за достижения из разных категорий.
        </Text>
      </Form>
      <h1>Ваши достижения на модерации</h1>
      <Table columns={columns_queue_table} dataSource={achievementQueueData} />
    </>
  );
};

export default AddAchivment;
