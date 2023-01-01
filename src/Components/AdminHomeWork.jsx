import { Button, Table, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const HomeWorkActionsBtns = () => {
  return (
    <>
      <Button type="primary">Edit</Button>
    </>
  );
};

const AdminHomeWork = () => {
  const createdHomeworks = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Для",
      dataIndex: "for",
      key: "for",
    },
    {
      title: "Дедлайн",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];

  return (
    <>
      <Button type="primary">Create</Button>
      <Title level={4} style={{ marginTop: 0 }}>
        Все домашние работы
      </Title>
      <Table columns={createdHomeworks} />
    </>
  );
};

export default AdminHomeWork;
