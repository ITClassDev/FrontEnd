import React, { useState } from "react";
import {
  Typography,
  Table,
  Modal,
  Button,
  Space,
  Input,
  Tag,
  Row,
  message,
  Upload,
  ColorPicker
} from "antd";
import { useEffect, useRef } from "react";
import { API } from "../api";
import CreateUserForm from "./CreateUserForm";
import Link from "antd/es/typography/Link";
import { config } from "../config";
import ProfileLink from "./ProfileLink";
import { UploadOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const API_URL = config.API_URL;
const STORAGE = config.STORAGE;

const { Search } = Input;
const { confirm } = Modal;
const { Title, Text } = Typography;



const AdminUsers = () => {
  const refreshUsersTable = () => {
    API({
      endpoint: "/groups", ok: (response) => {
        setUserGroups(response.data);
      }
    })

    API({
      endpoint: "/users", ok: (response) => {
        setUsersList(response.data.map(user => ({ key: user.uuid, id: user.uuid, fio: <ProfileLink user={user} storage={STORAGE} target="__blank" />, user_group: user.groupId, user_class: user.learningClass })));
      }
    })
  };
  const inputGroupNameRef = useRef();
  const [inputGroupColor, setInputGroupColor] = useState("#B32931");
  const [usersList, setUsersList] = useState();
  const [userGroups, setUserGroups] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    refreshUsersTable();
  }, []);
  const allUsersColumns = [
    {
      title: "UUID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (_, record) => (
        <Text>{record.id.slice(30)}...</Text>
      )
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
      render: (_, record) => {
        let group = userGroups.find(item => item.uuid === record.user_group);
        return <Tag color={group.color}>{group.name}</Tag>
      },

      filters: userGroups.map((e) => ({ value: e.uuid, text: e.name })),
      onFilter: (value, record) => record.user_group === value,
      filterSearch: true,
    },
    {
      title: "Класс",
      dataIndex: "user_class",
      key: "user_class",
      filters: [{value: 11, text: 11}, {value: 10, text: 10}],
      onFilter: (value, record) => record.user_class === value,
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
            confirm({
              title: 'Вы действительно хотите удалить этого пользователя?',
              icon: <ExclamationCircleFilled />,
              content: 'Отменить это действие невозможно!',
              async onOk() {
                return new Promise((resolve, reject) => {
                  API({
                    endpoint: `/users/${record.id}`, method: "delete", ok: () => {
                      setUsersList(usersList.filter(obj => obj.id !== record.id));
                      resolve();
                    }, message: { show: true, api: messageApi, ok: "Пользователь удалён", err: "Ошибка" }
                  });

                }).catch(() => console.log('Oops errors!'));
              },
              onCancel() { },
            });

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
      <Title level={4} style={{ marginTop: 10, marginBottom: 20 }}>
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
        <ColorPicker value={inputGroupColor} onChange={setInputGroupColor} />
        <Input placeholder="Название группы" ref={inputGroupNameRef} />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
          if (inputGroupNameRef.current.input.value) {
            API({
              endpoint: "/groups", method: "put", data: { name: inputGroupNameRef.current.input.value, color: inputGroupColor.toHexString() }, ok: (response) => {
                setUserGroups(prevState => [...prevState, { uuid: response.data.uuid, name: response.data.name, color: response.data.color }]);
              }
            });
          }
        }}></Button>
      </Space.Compact>
      <Row gutter={[5, 5]}>
        {userGroups.map((item) => (
          <Tag color={item.color} key={item.uuid} closable={true} onClose={() => {
            API({ endpoint: `/groups/${item.uuid}`, method: 'delete' })
          }}>{item.name}</Tag>
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
                id: response.data.uuid,
                key: response.data.uuid,
                fio: <ProfileLink user={response.data} storage={STORAGE} target="__blank" />,
                user_group: response.data.groupId,
                user_class: response.data.learningClass
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
          name: 'csv_file',
          action: `${API_URL}/users/csv`,
          method: 'put',
          maxCount: 1,
          accept: ".csv",
          headers: {
            authorization: `Bearer ${localStorage.getItem("userAccessToken")}`,
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              refreshUsersTable();
              
              if (info.file.response.errors.length === 0){
                messageApi.success("Пользователи созданы");
              }else{
                messageApi.error(`Ошибки: ${info.file.response.errors.join("; ")}`);
              }
              
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
