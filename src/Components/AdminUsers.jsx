import React from "react";
import { Typography, Table, Button, Space, Input, Avatar } from "antd";
import { Link } from "react-router-dom";
import { STORAGE } from "../config";

const { Search } = Input;
const { Title, Text } = Typography;

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
      fio: (
        <Link to={`/profile?id=${1}`}>
          <Avatar
            src={`${STORAGE}/avatars/${"1_avatar.png"}`}
            style={{ verticalAlign: "middle", marginRight: 10 }}
            size="large"
          ></Avatar>
          <Text strong>Stephan Zhdanov</Text>
        </Link>
      ),
      actionsBtns: <UserControllButtons />,
      key: 1,
    },
  ];
  return (
    <>
      <Title level={4} style={{marginTop: 0}}>Все пользователи</Title>
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
