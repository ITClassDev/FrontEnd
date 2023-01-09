import React from "react";
import { Modal, Form, Input, Button, Space, Typography } from "antd";

const { Text } = Typography;

const EditAppModal = ({ modalOpened, setModalOpened }) => {
  return (
    <Modal
      title="Редактировать приложение"
      transitionName=""
      open={modalOpened}
      footer={<></>}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
    >
      <Form
        name="update_app"
        className="update_app_form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Укажите название приложения",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Название приложения</Text>
            <Input placeholder="Title" />
          </Space>
        </Form.Item>

        <Form.Item
          name="redirect_url"
          rules={[
            {
              required: true,
              message: "Укажите redirect_url",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Адрес переадресации с токеном</Text>
            <Input
              placeholder="https://test.ru"
              addonAfter="?access_token=TOKEN"
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button
              type="primary"
              htmlType="submit"
              className="update-app-form-button"
            >
              Обновить
            </Button>

            <Button type="primary" danger className="delete-app-form-button">
              Удалить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAppModal;
