import React, { useState } from "react";
import { Typography, Table, Button, Space, Input } from "antd";
import { useEffect } from "react";
import { getAllUsers } from "../api";
import NameAndAvatar from "./NameAndAvatar";

const { Search } = Input;
const { Title } = Typography;

const UserControllButtons = ({ user_id }) => {
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
  const [usersList, setUsersList] = useState();
  useEffect(() => {
    let all_users = [];
    getAllUsers(
      (response) => {
        response.data.forEach((user) => {
          all_users.push({
            id: user.id,
            fio: (
              <NameAndAvatar
                user_id={user.id}
                name={`${user.firstName} ${user.lastName}`}
                avatar={user.userAvatarPath}
              />
            ),
            actionsBtns: <UserControllButtons user_id={user.id} />,
            key: user.id,
          });
        });
        setUsersList(all_users);
      },
      () => {}
    );
  }, []);
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
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        Все пользователи
      </Title>
      <Search
        placeholder="Поиск пользователя по имени и фамилии"
        enterButton
        style={{ marginBottom: 20 }}
      />
      <Table columns={allUsersColumns} dataSource={usersList} />
      <Title level={4} style={{ marginTop: 0 }}>
        Добавить одного
      </Title>
      PLACEHOLDER

      <Title level={4} style={{ marginTop: 0 }}>
        Добавить класс
      </Title>
      PLACEHOLDER
    </>
  );
};

export default AdminUsers;
