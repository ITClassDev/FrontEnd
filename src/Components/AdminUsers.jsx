import React from "react";
import { Typography, Table } from "antd";

const { Title } = Typography;

const AdminUsers = () => {
  const allUsersColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Имя",
      dataIndex: "fio",
      key: "fio",
    },
    {
      title: "Редактировать",
      dataIndex: "editBtn",
      key: "editBtn",
    },
  ];
  const testUsersData = [
    {
      id: 1,
      fio: <>Stephan Zhdanov</>,
      key: 1,
    },
  ];
  return (
    <>
      <Title level={4}>Все пользователи</Title>
      <Table columns={allUsersColumns} dataSource={testUsersData}/>
    </>
  );
};

export default AdminUsers;
