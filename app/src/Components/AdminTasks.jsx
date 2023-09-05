import React, { useEffect, useState } from "react";
import { Typography, Table, Space, Button, Modal, Form, message } from "antd";
import { API } from "../api";
import TaskForm from "./TaskForm";
import { sendTask } from "../api";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskCard from "./CreateTaskCard";

const { Title, Text } = Typography;

const AdminTasks = ({ currentTab }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState("Loading...");
  const [editTaskTypes, setEditTaskTypes] = useState(null);
  const [editTaskUUID, setEditTaskUUID] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const [form] = Form.useForm();
  const load = () => {
    API({
      endpoint: "/assigments/tasks", ok: (response) => {
        SetAllTasks(response.data.map(task => (
          { key: task.uuid, id: task.uuid, title: task.title, dayChallenge: task.dayChallenge }
        )))
      }
    });
  }

  useEffect(() => {
    if (currentTab === "tasks") load();
  }, [currentTab]);

  const tasksColumnsTable = [
    {
      title: "ID задачи",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Задача дня",
      dataIndex: "dayChallenge",
      key: "dayChallenge",
      render: (_, record) => (
        record.dayChallenge ? <Text code type="success">Задача дня</Text> : ""
      )
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Статистика</Button>
          <Button type="dashed" onClick={() => {
            API({
              endpoint: `/assigments/tasks/${record.id}`, ok: (response) => {
                setEditTaskTitle(response.data.title);
                setEditTaskTypes(response.data.testsTypes);
                setEditTaskUUID(response.data.uuid);
                form.setFieldsValue(response.data);
              }
            });
            setEditModalOpen(true);
          }}>
            Редактировать
          </Button>
          <Button type="primary" danger>
            Удалить
          </Button>
        </Space>
      )
    },
  ];
  const [allTasks, SetAllTasks] = useState();
  return (
    <>
      {contextHolder}
      <Modal
        title="Добавить задачу"
        transitionName=""
        open={createTaskModalOpen}
        width={"50%"}
        footer={<></>}
        onOk={() => {
          setCreateTaskModalOpen(false);
        }}
        onCancel={() => {
          setCreateTaskModalOpen(false);
        }}
      >
        <CreateTaskCard messageApi={messageApi} callback={() => { setCreateTaskModalOpen(false); load(); }} />
      </Modal>
      <Modal
        title={editTaskTitle}
        transitionName=""
        open={editModalOpen}
        width={"50%"}
        footer={<></>}
        onOk={() => {
          setEditModalOpen(false);
        }}
        onCancel={() => {
          setEditModalOpen(false);
        }}
      >
        <TaskForm form={form} name="update_task" createTaskFormHandler={(data) => {
          sendTask(`/assigments/tasks/${editTaskUUID}`, "patch", data, messageApi, f => f, "Задача успешно обновлена!", "Задча НЕ обновлена! Проверьте данные!");
          load();
        }} types={editTaskTypes} />
      </Modal>
      <Title level={4} style={{ marginTop: 0 }}>
        Все задачи
      </Title>
      <Button type="dashed" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }} style={{ marginBottom: 20 }}>
        Добавить новую задачу
      </Button>
      <Table columns={tasksColumnsTable} dataSource={allTasks} />
    </>
  );
};

export default AdminTasks;
