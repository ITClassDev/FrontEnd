import React, { useEffect, useState } from "react";
import { Typography, Table, Space, Button, Modal } from "antd";
import { API } from "../api";
import TaskForm from "./TaskForm";

const { Title, Text } = Typography;



const AdminTasks = ({currentTab}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ title: "Default" });

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
    if (currentTab == "tasks") load();
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
                setEditTaskData(response.data);
                console.log(editTaskData);
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
      <Modal
        title={editTaskData.title}
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
        <TaskForm createTaskFormHandler={(data) => {
          console.log(data);
        }} defaults={editTaskData} />
      </Modal>
      <Title level={4} style={{ marginTop: 0 }}>
        Все задачи
      </Title>
      <Table columns={tasksColumnsTable} dataSource={allTasks} />
    </>
  );
};

export default AdminTasks;
