import React, { useEffect, useState } from "react";
import { Typography, Table, Space, Button } from "antd";
import { API } from "../api";

const { Title } = Typography;


const AdminTasks = () => {
  useEffect(() => {
    API({
      endpoint: "/programming_tasks/tasks/all", ok: (response) => {
        console.log(response);
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
          <Button type="dashed">
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
      <Title level={4} style={{ marginTop: 0 }}>
        Все задачи
      </Title>
      <Table columns={tasksColumnsTable} dataSource={allTasks} />
    </>
  );
};

export default AdminTasks;
