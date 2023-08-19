import React, { useState } from "react";
import { Typography, Table, Button, Space, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskCard from "./CreateTaskCard";
import { useEffect } from "react";
import { API } from "../api";
import ProfileLink from "./ProfileLink";

import { config } from "../config";

const STORAGE = config.STORAGE;

const { Title, Text } = Typography;

const fetch = (value, callback) => {
  API({
    endpoint: `/assigments/tasks/search?query=${value}`, ok: (resp) => {
      callback(resp.data.map(task => ({
        value: task.title,
        label: task.uuid
      })))
    }
  })
};

const SearchInput = ({placeholder, style, taskSearchSelect, callback}) => {
  const [data, setData] = useState([]);
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue) => {
    console.log(data);
    callback(newValue);
  };
  return (
    <Select
      showSearch
      value={taskSearchSelect}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={() => {console.log()}}
      notFoundContent={<>Ничего не найдено</>}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const AdminDayChallenge = () => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [taskSearchSelect, setTaskSearchSelect] = useState();


  const solvedByTableColumns = [
    {
      title: "ID решения",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ученик",
      dataIndex: "fio",
      key: "fio",
      render: (_, record) => <ProfileLink user={record.user} storage={STORAGE} />
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Код решения</Button>
          <Button type="dashed" danger>
            Отклонить
          </Button>
        </Space>
      )
    },
  ];


  const [currentDayChallenge, SetCurrentDayChallenge] = useState({});
  const [solvedByUsers, setSolvedByUsers] = useState([]);
  const fetchLeaderBoard = () => {
    API({
      endpoint: "/assigments/tasks/challenge/leaderboard", ok: (resp) => {
        setSolvedByUsers(resp.data.map(item => ({
          id: item.userId,
          key: item.userId,
          fio: "1",
          user: { ...item, uuid: item.userId }
        })));
      }
    })
  }
  useEffect(() => {
    API({
      endpoint: "/assigments/tasks/challenge", ok: (resp) => {
        SetCurrentDayChallenge(resp.data);
        // Set leaderboard
        if (resp.data) fetchLeaderBoard();
      }
    });
  }, []);
  
  return (
    <>
      {contextHolder}
      <Modal
        title="Добавить задачу"
        transitionName=""
        open={createTaskModalOpen}
        width={"50%"}
        footer={<></>}
        onOk={() => {
          setCreateTaskModalOpen(false);
        }}
        onCancel={() => {
          setCreateTaskModalOpen(false);
        }}
      >
        <CreateTaskCard messageApi={messageApi} callback={() => { setCreateTaskModalOpen(false) }} />
      </Modal>

      {currentDayChallenge["uuid"] ? (<>
        <Title level={4} style={{ marginTop: 0 }}>
          Задача дня: {currentDayChallenge.title}
        </Title>
        <Title level={4} style={{ marginTop: 0 }}>
          Решившие задачу - {solvedByUsers.length}
        </Title>
        <Table columns={solvedByTableColumns} dataSource={solvedByUsers} />
      </>)
        : <Text>Задача дня ещё не установлена</Text>}

      <Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>
        Выбрать задачу дня
      </Title>
      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>

        <SearchInput
          placeholder="Поиск задачи по заголовку"
          style={{ width: "100%" }}
          taskSearchSelect={taskSearchSelect}
          callback={(value) => setTaskSearchSelect(value)}
        />
      </Space>
      <Space>
        <Button type="primary" onClick={() => {
          console.log(taskSearchSelect);
          // API({ endpoint: `/assigments/tasks/challenge/set/${taskSearchSelect}`, method: "patch" })
        }}>Сделать задачей дня</Button>
        <Button type="dashed" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }}>
          Добавить новую задачу
        </Button>
      </Space>
    </>
  );
};

export default AdminDayChallenge;
