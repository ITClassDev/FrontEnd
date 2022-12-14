import React, { useState } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  Input,
  Tag,
  Row,
  message,
} from "antd";
import { useEffect } from "react";
import { createUser, getAllUsers } from "../api";
import NameAndAvatar from "./NameAndAvatar";
import CreateUserForm from "./CreateUserForm";

const { Search } = Input;
const { Title } = Typography;

const UserControllButtons = ({ user_id }) => {
  return (
    <Space direction="horizontal">
      <Button type="primary">Редактировать</Button>
      <Button type="dashed" danger>
        Удалить
      </Button>
    </Space>
  );
};

const AdminUsers = () => {
  const refreshUsersTable = () => {
    let all_users = [];
    getAllUsers(
      (response) => {
        setUserGroups(response.data.user_groups);
        response.data.users.forEach((user) => {
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
            user_group: <Tag color="geekblue">{user.groupName}</Tag>,
            key: user.id,
          });
        });
        setUsersList(all_users);
      },
      () => {}
    );
  };
  const [usersList, setUsersList] = useState();
  const [userGroups, setUserGroups] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    refreshUsersTable();
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
      title: "Группа",
      dataIndex: "user_group",
      key: "user_group",
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];

  const createUserFormHandler = (data) => {
    createUser(
      data,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Пользователь создан успешно!",
        });
        refreshUsersTable();
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Ошибка! Проверьте введённые данные.",
        });
      }
    );
  };

  return (
    <>
      {contextHolder}
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
        Группы пользователей
      </Title>
      <Row gutter={[5, 5]}>
        {userGroups.map((item) => (
          <Tag color="geekblue" key={item.id}>{item.name}</Tag>
        ))}
      </Row>
      <Title level={4} style={{ marginTop: 10 }}>
        Добавить одного пользователя
      </Title>
      <CreateUserForm
        createUserFormHandler={createUserFormHandler}
        userGroups={userGroups}
      />
      <Title level={4} style={{ marginTop: 0 }}>
        Добавить несколько пользователей
      </Title>
      PLACEHOLDER
    </>
  );
};

export default AdminUsers;
