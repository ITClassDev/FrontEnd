import React, { useEffect, useState } from "react";
import { Typography, Table, Space, Button, Modal } from "antd";
import { API } from "../api";
import TaskForm from "./TaskForm";

const { Title } = Typography;



const AdminTasks = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ memory_limit: 1024, time_limit: 2, is_day_challenge: true, title: "123" });

  useEffect(() => {
    API({
      endpoint: "/programming_tasks/tasks/all", ok: (response) => {
        SetAllTasks(response.data.map(val => (
          { key: val.id, id: val.id, title: val.title }
        )))
      }
    });
  }, []);
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
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Статистика</Button>
          <Button type="dashed" onClick={() => {
            API({
              endpoint: `/programming_tasks/task/${record.id}`, ok: (response) => {
                setEditTaskData(response.data);
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
