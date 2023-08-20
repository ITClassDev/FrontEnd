import React, { useState, useEffect } from "react";
import { Modal, Space, Typography, Form, Input, Button, Select, DatePicker } from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { API } from "../api";
import MultipleTaskSearch from "./MultipleTasksSearch";

const { Text } = Typography;

const CreateNewContestModal = ({ open, setModalOpened, userGroups }) => {
  const [tasksSelected, setTasksSelected] = useState([]);
  
  const createContestHandler = (form_data) => {
    console.log(form_data);
    console.log(tasksSelected);
  }




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
      <Form name="create_contest" className="create-contest-form" onFinish={createContestHandler}>
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
          name="tasks"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Задачи в контесте</Text>
            <MultipleTaskSearch value={tasksSelected} setValue={setTasksSelected} />
          </Space>
        </Form.Item>

        <Form.Item
          name="user_groups"
        // rules={[
        //   {
        //     required: true,
        //     message: "Выберите группы пользователей",
        //   },
        // ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Группы пользователей</Text>
            <Select
              mode="tags"
              options={userGroups.map((item) => ({
                value: item.uuid,
                label: item.name,
              }))}
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
            />
          </Space>
        </Form.Item>

        <Form.Item
          name="deadline"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Дата окончания</Text>
            <DatePicker locale={locale} />
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
