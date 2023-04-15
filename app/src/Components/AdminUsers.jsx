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
  Upload
} from "antd";
import { useEffect } from "react";
import { API, getAllUsers } from "../api";
import NameAndAvatar from "./NameAndAvatar";
import CreateUserForm from "./CreateUserForm";
import Link from "antd/es/typography/Link";
import API_URL from "../config";
import { UploadOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title } = Typography;



const AdminUsers = () => {
  const refreshUsersTable = () => {
    API({
      endpoint: "/admin/all_users", ok: (response) => {
        setUserGroups(response.data.user_groups);
        setUsersList(response.data.users.map(user => ({ key: user.id, id: user.id, fio: <NameAndAvatar user_id={user.id} name={`${user.firstName} ${user.lastName}`} avatar={user.userAvatarPath} />, user_group: <Tag color="geekblue">{user.groupName}</Tag>, })));
      }
    })

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
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Редактировать</Button>
          <Button type="dashed" danger onClick={() => {
            API({
              endpoint: `/users/${record.id}/delete`, method: "delete", ok: () => {
                setUsersList(usersList.filter(obj => obj.id !== record.id))
              }, message: { show: true, api: messageApi, ok: "Пользователь удалён", err: "Ошибка" }
            })

          }}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

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
        createUserFormHandler={(data) => { API({ endpoint: "/users/create_user", method: "put", data: data, message: { show: true, api: messageApi, ok: "Пользователь успешно создан!", err: "Ошибка! Проверьте введённые данные." } }) }}
        userGroups={userGroups}
      />
      <Title level={4} style={{ marginTop: 0 }}>
        Добавить несколько пользователей через csv
      </Title>
      <Space direction="vertical">
        Загрузите csv файл с описанием пользователей:
        <Upload {...{
          name: 'users',
          action: `${API_URL}/users/from_csv`,
          method: 'put',
          accept: ".csv",
          headers: {
            authorization: 'authorization-text',
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        }}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Link href="/Docs/create_users.csv" target="__blank">Пример файла</Link>
      </Space>

    </>
  );
};

export default AdminUsers;
