import React from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  InputNumber,
  Space,
  Checkbox,
} from "antd";
import {
  FieldStringOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { createTask } from "../api";

const { TextArea } = Input;
const { Text } = Typography;

const CreateTaskCard = ({ messageApi }) => {
  const createTaskFormHandler = (form_data) => {
    createTask(
      form_data,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Задача успешно добавлена!",
        });
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Задача не добавлена! Проверьте данные!",
        });
      }
    );
  };

  return (
    <>
      <Form
        name="add_task"
        className="create-task-form"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          memory_limit: 1024,
          time_limit: 2,
          is_day_challenge: true,
        }}
        onFinish={createTaskFormHandler}
      >
        <Form.Item
          name="title"
          label="Название задачи"
          rules={[
            {
              required: true,
              message: "Введите заголовок",
            },
          ]}
        >
          <Input
            prefix={<FieldStringOutlined className="site-form-item-icon" />}
            placeholder="Название задачи (тайтл)"
          />
        </Form.Item>
        <Form.Item
          name="text"
          label="Текст задачи"
          rules={[
            {
              required: true,
              message: "Введите текст задачи",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Условие задачи" />
        </Form.Item>
        <Form.Item
          name="time_limit"
          label="Максимальное время работы решения (секунды)"
          rules={[
            {
              required: true,
              message: "Укажите лимит на время работы решения",
            },
          ]}
        >
          <InputNumber min={1} max={50} />
        </Form.Item>
        <Form.Item
          name="memory_limit"
          label="Максимальный объём используемой памяти решением (КБ)"
          rules={[
            {
              required: true,
              message: "Укажите лимит на использованную память программой",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <InputNumber min={32} max={4096} />
        </Form.Item>

        <Form.Item name="is_day_challenge" valuePropName="checked">
          <Checkbox>Сделать задачей дня</Checkbox>
        </Form.Item>

        <Text className="testsTitleEasyMode" strong>
          Тесты (easy mode)
        </Text>

        <Form.List name="tests">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "center",
                  }}
                  align="center"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "input"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing input data",
                      },
                    ]}
                  >
                    <TextArea placeholder="Checker input" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "output"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing output data",
                      },
                    ]}
                  >
                    <TextArea placeholder="Excepted output" />
                  </Form.Item>
                  <Space direction="vertical">
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    <Form.Item name={[name, "demo"]} valuePropName="checked">
                      <Checkbox>Пример</Checkbox>
                    </Form.Item>
                  </Space>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить тест
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="create-task-button"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTaskCard;
