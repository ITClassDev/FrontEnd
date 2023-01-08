import React from "react";
import { Modal, Form, Input, Button, Space, Typography } from "antd";

const { Text } = Typography;
const { TextArea } = Input;


const CreateAppModal = ({ modalOpened, setModalOpened }) => {
  return (
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
            <Input placeholder="https://test.ru" addonAfter="?access_token=TOKEN"/>
          </Space>
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Укажите описание приложения",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Описание приложения (для модерации)</Text>
            <TextArea rows={5} placeholder="Этот текст читает модерация, после чего принимает решение о включении вашего приложения. Постарайтесь максимально описать зачем в вашему приложению нужна аутентификация через ШТП"/>
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
  );
};

export default CreateAppModal;
