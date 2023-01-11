import React, { useState } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  Input,
  Tag,
  Row,
  Form,
  Select,
  InputNumber,
} from "antd";
import { useEffect } from "react";
import { getAllUsers } from "../api";
import NameAndAvatar from "./NameAndAvatar";

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

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
  const [usersList, setUsersList] = useState();
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
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

  const createUser = (data) => {
    console.log(data);
  };

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
        Группы пользователей
      </Title>
      <Row gutter={[5, 5]}>
        {userGroups.map((item) => (
          <Tag key={item.id}>{item.name}</Tag>
        ))}
      </Row>
      <Title level={4} style={{ marginTop: 10 }}>
        Добавить одного
      </Title>
      <Form
        name="create_user"
        requiredMark={false}
        className="create-user-form"
        onFinish={createUser}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label="Имя"
          rules={[
            {
              required: true,
              message: "Введите имя",
            },
          ]}
        >
          <Input placeholder="Иван" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Фамилия"
          rules={[
            {
              required: true,
              message: "Введите фамилию",
            },
          ]}
        >
          <Input placeholder="Иванов" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Введите email",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
          ]}
        >
          <Input placeholder="пароль" />
        </Form.Item>

        <Form.Item
          name="userRole"
          label="Роль"
          rules={[
            {
              required: true,
              message: "Выберите роль",
            },
          ]}
        >
          <Select>
            <Option value={0}>Ученик</Option>
            <Option value={1}>Преподаватель</Option>
            <Option value={2}>Администратор</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="learningClass"
          label="Класс обучения"
          rules={[
            {
              required: true,
              message: "Введите класс обучения",
            },
          ]}
        >
          <InputNumber min={5} max={11} />
        </Form.Item>
        <Form.Item name="groupId" label="Категория пользователя" rules={[
            {
              required: true,
              message: "Выберите категорию пользователя",
            },
          ]}>
          <Select
            options={userGroups.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
      <Title level={4} style={{ marginTop: 0 }}>
        Добавить несколько пользователей
      </Title>
      PLACEHOLDER
    </>
  );
};

export default AdminUsers;
