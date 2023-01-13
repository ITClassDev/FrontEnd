import React from "react";
import { Modal, Form, Input, Button, Space, Typography, message } from "antd";
import { createOauthApp } from "../api";

const { Text } = Typography;

const CreateAppModal = ({ modalOpened, setModalOpened, updateAppsTable }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const createAppFormHandler = (app_data) => {
    createOauthApp(
      app_data,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Приложение успешно создано!",
        });
        updateAppsTable();
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Ошибка при создании приложения!",
        });
      }
    );
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Создать новое приложение"
        open={modalOpened}
        transitionName=""
        footer={<></>}
        onOk={() => {
          setModalOpened(false);
        }}
        onCancel={() => {
          setModalOpened(false);
        }}
      >
        <Form
          name="create_app"
          className="create_app_form"
          onFinish={createAppFormHandler}
        >
          <Form.Item
            name="name"
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
            <Button
              type="primary"
              htmlType="submit"
              className="create-app-form-button"
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAppModal;
