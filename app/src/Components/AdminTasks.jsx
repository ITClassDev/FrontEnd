import React, { useEffect, useState } from "react";
import { Typography, Table, Space, Button } from "antd";
import { getAllTasks } from "../api";

const { Title } = Typography;

const ActionsBtnsItem = ({ task_id }) => {
  return (
    <Space direction="horizontal">
      <Button type="primary">Просмотр</Button>
      <Button type="dashed">
        Редактировать
      </Button>
      <Button type="primary" danger>
        Удалить
      </Button>
    </Space>
  );
};

const AdminTasks = () => {
  useEffect(() => {
    getAllTasks(
      (response) => {
        let result = [];
        response.data.forEach((task) => {
          result.push({
            key: task.id,
            id: task.id,
            title: task.title,
            actionsBtns: <ActionsBtnsItem />,
          });
        });
        SetAllTasks(result);
      },
      () => {}
    );
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
    },
  ];
  const [allTasks, SetAllTasks] = useState();
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        Все задачи
      </Title>
      <Table columns={tasksColumnsTable} dataSource={allTasks} />
    </>
  );
};

export default AdminTasks;
