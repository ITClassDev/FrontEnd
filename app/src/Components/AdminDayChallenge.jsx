import React, { useState, useEffect } from "react";
import { Typography, Table, Button, Space, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskCard from "./CreateTaskCard";
import { API } from "../api";
import ProfileLink from "./ProfileLink";
import TasksSearch from "./TasksSearch";

import { config } from "../config";

const STORAGE = config.STORAGE;

const { Title, Text } = Typography;

const AdminDayChallenge = () => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [taskSearchSelect, setTaskSearchSelect] = useState({ text: null, uuid: null });
  const solvedByTableColumns = [
    {
      title: "UUID",
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
          Решившие задачу: {solvedByUsers.length}
        </Title>
        <Table columns={solvedByTableColumns} dataSource={solvedByUsers} />
      </>)
        : <Text>Задача дня ещё не установлена</Text>}

      <Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>
        Выбрать задачу дня
      </Title>
      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>

        <TasksSearch
          placeholder="Поиск задачи по заголовку"
          style={{ width: "100%" }}
          taskSearchSelect={taskSearchSelect.text}
          callback={(text, uuid) => setTaskSearchSelect({ text: text, uuid: uuid })}
        />
      </Space>
      <Space>
        <Button type="primary" onClick={() => {
          API({
            endpoint: `/assigments/tasks/challenge/set/${taskSearchSelect.uuid}`, method: "patch", ok: (resp) => {
              SetCurrentDayChallenge(resp.data)
              fetchLeaderBoard();
            }, message: { show: 1, api: messageApi, ok: "Задача дня установлена", err: "Произошла ошибка!" }
          })
        }}>Сделать задачей дня</Button>
        <Button type="dashed" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }}>
          Добавить новую задачу
        </Button>
      </Space>
    </>
  );
};

export default AdminDayChallenge;
