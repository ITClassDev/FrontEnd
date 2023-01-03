import React from "react";
import { Button, Form, Input, Typography, InputNumber, Space, Checkbox } from "antd";
import {
  FieldStringOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const CreateTaskCard = () => {
  return (
    <>
      <Form
        name="add_task"
        className="create-task-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="task_title"
          rules={[
            {
              required: true,
              message: "Введите заголовок",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Название задачи</Text>
            <Input
              prefix={<FieldStringOutlined className="site-form-item-icon" />}
              placeholder="Название задачи (тайтл)"
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="task_description"
          rules={[
            {
              required: true,
              message: "Введите текст задачи",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Текст задачи</Text>
            <TextArea rows={4} placeholder="Условие задачи" />
          </Space>
        </Form.Item>
        <Form.Item
          name="time_limit"
          rules={[
            {
              required: true,
              message: "Укажите лимит на время работы решения",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Максимальное время работы решения (секунды)</Text>
            <InputNumber min={1} max={50} defaultValue={1} />
          </Space>
        </Form.Item>
        <Form.Item
          name="memory_limit"
          rules={[
            {
              required: true,
              message: "Укажите лимит на использованную память программой",
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>
              Максимальный объём используемой памяти решением (КБ)
            </Text>
            <InputNumber min={32} max={4096} defaultValue={1024} />
          </Space>
        </Form.Item>
        <Text className="testsTitleEasyMode" strong>
          Тесты (easy mode)
        </Text>
        
        <Form.List name="task_tests">
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
                    <Form.Item
                      name={[name, "demo"]}
                      valuePropName="checked">
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
