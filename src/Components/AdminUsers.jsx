import React from "react";
import { Typography, Table, Button, Space, Input } from "antd";

const { Search } = Input;

const { Title } = Typography;

const UserControllButtons = () => {
  return (
    <Space direction="horizontal">
      <Button type="primary">Редактировать</Button>
      <Button type="dashed" danger>
        Удалить
      </Button>
      <Button type="primary" danger>
        Забанить (ахахахах)
      </Button>
    </Space>
  );
};

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
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];
  const testUsersData = [
    {
      id: 1,
      fio: <>Stephan Zhdanov</>,
      actionsBtns: <UserControllButtons />,
      key: 1,
    },
  ];
  return (
    <>
      <Title level={4}>Все пользователи</Title>
      <Search
        placeholder="Поиск пользователя по имени и фамилии"
        enterButton
        style={{ marginBottom: 20 }}
      />

      <Table columns={allUsersColumns} dataSource={testUsersData} />
    </>
  );
};

export default AdminUsers;
