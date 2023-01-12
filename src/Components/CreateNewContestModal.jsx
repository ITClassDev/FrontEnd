import React from "react";
import { Modal, Space, Typography, Form, Input, Button, Select } from "antd";

const { Text } = Typography;

const CreateNewContestModal = ({ open, setModalOpened }) => {
  return (
    <Modal
      title="Новый контест"
      transitionName=""
      open={open}
      footer={<></>}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
    >
      <Form name="create_contest" className="create-contest-form">
        <Form.Item
          name="contest_name"
          rules={[
            {
              required: true,
              message: "Введите название контеста",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Название контеста</Text>
            <Input placeholder="Название" />
          </Space>
        </Form.Item>
        <Form.Item
          name="contest_description"
          rules={[
            {
              required: true,
              message: "Введите описание контеста",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Описание контеста</Text>
            <Input placeholder="Короткое описание" />
          </Space>
        </Form.Item>
        <Form.Item
          name="contest_tasks"
          rules={[
            {
              required: true,
              message: "Выберите задачи",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Задачи в контесте</Text>
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
            />
          </Space>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNewContestModal;
