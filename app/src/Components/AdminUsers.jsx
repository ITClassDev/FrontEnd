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
import { useEffect, useRef } from "react";
import { API } from "../api";
import NameAndAvatar from "./NameAndAvatar";
import CreateUserForm from "./CreateUserForm";
import Link from "antd/es/typography/Link";
import { config } from "../config";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const API_URL = config.API_URL;

const { Search } = Input;
const { Title } = Typography;



const AdminUsers = () => {
  const refreshUsersTable = () => {
    API({
      endpoint: "/users", ok: (response) => {
        setUserGroups(response.data.userGroups);
        setUsersList(response.data.users.map(user => ({ key: user.id, id: user.id, fio: <NameAndAvatar user_id={user.id} name={`${user.firstName} ${user.lastName}`} avatar={user.userAvatarPath} />, user_group: user.groupName, })));
      }
    })
  };
  const inputGroupNameRef = useRef();
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
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Имя",
      dataIndex: "fio",
      key: "fio",
      // sorter: (a, b) => a.fio.localeCompare(b.fio)
    },
    {
      title: "Группа",
      dataIndex: "user_group",
      key: "user_group",
      render: (_, record) => (
        <Tag color="geekblue">{record.user_group}</Tag>
      ),
      filters: userGroups.map((e) => ({value: e.name, text: e.name})),
      onFilter: (value, record) => record.user_group === value,
      filterSearch: true,
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
              endpoint: `/users/${record.id}`, method: "delete", ok: () => {
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
      <Space.Compact style={{ marginBottom: 10 }}>
        <Input placeholder="Название группы" ref={inputGroupNameRef} />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
          if (inputGroupNameRef.current.input.value) {
            API({
              endpoint: "/users/groups", method: "put", data: { name: inputGroupNameRef.current.input.value }, ok: (response) => {
                setUserGroups(prevState => [...prevState, { id: response.data.groupId, name: inputGroupNameRef.current.input.value }]);
              }
            });
          }
        }}></Button>
      </Space.Compact>
      <Row gutter={[5, 5]}>
        {userGroups.map((item) => (
          <Tag color="geekblue" key={item.id}>{item.name}</Tag>
        ))}
      </Row>
      <Title level={4} style={{ marginTop: 10 }}>
        Добавить одного пользователя
      </Title>
      <CreateUserForm
        createUserFormHandler={(data) => {
          API({
            endpoint: "/users", method: "put", data: data, message: { show: true, api: messageApi, ok: "Пользователь успешно создан!", err: "Ошибка! Проверьте введённые данные." }, ok: (response) => {
              console.log(response);
              setUsersList(prevState => [...prevState, {
                id: response.data.userId,
                key: response.data.userId,
                fio: <NameAndAvatar user_id={response.data.userId} name={`${data.firstName} ${data.lastName}`} avatar={"default.png"} />,
                user_group: "Новый"
              }]);
            }
          })
        }}
        userGroups={userGroups}
      />
      <Title level={4} style={{ marginTop: 0 }}>
        Добавить несколько пользователей через csv
      </Title>
      <Space direction="vertical">
        Загрузите csv файл с описанием пользователей:
        <Upload {...{
          name: 'file',
          action: `${API_URL}/users/from_csv`,
          method: 'put',
          maxCount: 1,
          accept: ".csv",
          headers: {
            authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              refreshUsersTable();
              messageApi.success("Пользователи созданы");
            } else if (info.file.status === 'error') {
              messageApi.error("Ошибка при загрузке файла");
            }
          },
        }}>
          <Button icon={<UploadOutlined />}>Выберите файл</Button>
        </Upload>
        <Link href="/Docs/create_users.csv" target="__blank">Пример файла</Link>
      </Space>

    </>
  );
};

export default AdminUsers;
