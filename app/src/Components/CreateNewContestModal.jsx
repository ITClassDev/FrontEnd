import React, { useState } from "react";
import { Modal, Space, Typography, Form, Input, Button, Select, DatePicker, message, InputNumber } from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { API } from "../api";
import MultipleTaskSearch from "./MultipleTasksSearch";

const { Text } = Typography;

const CreateNewContestModal = ({ open, setModalOpened, userGroups, onCreate }) => {
  const [tasksSelected, setTasksSelected] = useState([]);
  const [deadlineInput, setDeadlineInput] = useState();
  const [userGroupsInput, setUserGroupsInput] = useState([]);
  const [userClassInput, setUserClassInput] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const createContestHandler = (form_data) => {
    API({
      endpoint: "/assigments/contests", method: "put", data: {
        tasks: tasksSelected.map(task => (task.value)),
        forGroups: userGroupsInput,
        title: form_data.contest_name,
        description: form_data.contest_description,
        deadline: deadlineInput.substring(0, deadlineInput.length - 5),
        forLearningClass: userClassInput,
        mark5: form_data.mark5,
        mark4: form_data.mark4,
        mark3: form_data.mark3
      }, ok: () => {
        form.resetFields();
        onCreate();
      }, message: { show: true, api: messageApi, ok: "Контест создан", err: "Контест не создан" }
    })
  }

  return (
    <>
      {contextHolder}
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
        <Form name="create_contest" className="create-contest-form" onFinish={createContestHandler} form={form}>
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
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Группы пользователей</Text>
              <Select
                mode="tags"
                value={userGroupsInput}
                onChange={(e) => {
                  setUserGroupsInput(e)
                }}
                options={userGroups.map((item, index) => ({
                  key: index,
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
            name="learningClass"
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Класс обучения</Text>
              <Select
                options={[{
                  value: 10,
                  title: 10
                },
                {
                  value: 11,
                  title: 11
                }]}
                value={userClassInput}
                onChange={(e) => {
                  setUserClassInput(e)
                }}

                style={{
                  width: "100%",
                }}
              />
            </Space>
          </Form.Item>


          <Form.Item
            name="deadline"
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Дата окончания</Text>
              <DatePicker locale={locale} placeholder="Последний день для сдачи контеста" format="YYYY-DD-MM HH:mm:ss" showTime={true} onChange={(e) => {
                if (e) setDeadlineInput(e.$d.toISOString());
              }} />
            </Space>

          </Form.Item>
          <Text strong>Система оценивания</Text>
          <Form.Item
            name="mark5"
            rules={[
              {
                required: true,
                message: "Введите границу оценки 5",
              },
            ]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Минимум для `5`</Text>
              <InputNumber min={1} max={10000} placeholder="10 задач" />
            </Space>

          </Form.Item>
          <Form.Item
            name="mark4"
            rules={[
              {
                required: true,
                message: "Введите границу оценки 4",
              },
            ]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Минимум для `4`</Text>
              <InputNumber min={1} max={10000} placeholder="7 задач" />
            </Space>

          </Form.Item>
          <Form.Item
            name="mark3"
            rules={[
              {
                required: true,
                message: "Введите границу оценки 3",
              },
            ]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Минимум для `3`</Text>
              <InputNumber min={1} max={10000} placeholder="5 задач" />
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
    </>
  );
};

export default CreateNewContestModal;