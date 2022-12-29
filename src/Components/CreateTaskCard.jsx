import React from "react";
import { Button, Form, Input } from "antd";
import {
  FieldStringOutlined,
} from "@ant-design/icons";

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
          <Input
            prefix={<FieldStringOutlined className="site-form-item-icon" />}
            placeholder="Название задачи (тайтл)"
          />
        </Form.Item>

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
