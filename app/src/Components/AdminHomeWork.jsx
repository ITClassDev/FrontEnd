import { Button, Table, Typography, Tag, Space } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CreateNewContestModal from "./CreateNewContestModal";
import { API, convertDateAndTime } from "../api";

const { Title } = Typography;


const AdminHomeWork = ({ currentTab }) => {
  const [createContestModal, setCreateTaskModalOpen] = useState(false);
  const [contests, setContests] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const getAllContest = () => {
    API({
      endpoint: "/assigments/contests", ok: (resp) => {
        setContests(resp.data.map(contest => ({
          key: contest.uuid,
          title: contest.title,
          for: contest.forGroups,
          forLearningClass: contest.forLearningClass,
          deadline: contest.deadline

        })));
      }
    })
  }

  const load = () => {
    API({
      endpoint: "/groups", ok: (response) => {
        setUserGroups(response.data);
      }
    });
    getAllContest();
  }

  useEffect(() => {
    if (currentTab == "homeWorks") load();
  }, [currentTab]);
  //let group = userGroups.find(item => item.uuid === record.user_group);

  const createdHomeworks = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Для",
      dataIndex: "for",
      key: "for",
      render: (_, record) => (
        record.for.map(uuid => {
          let group = userGroups.find(item => item.uuid === uuid);
          return <Tag color={group.color}>{record.forLearningClass}: {group.name}</Tag>
        })
      )
    },
    {
      title: "Дедлайн",
      dataIndex: "deadline",
      key: "deadline",
      render: (_, record) => (
        convertDateAndTime(record.deadline)
      )
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary">Статистика</Button>
          <Button type="dashed">Редактировать</Button>
        </Space>
      )
    },
  ];

  return (
    <>
      <CreateNewContestModal open={createContestModal} setModalOpened={setCreateTaskModalOpen} userGroups={userGroups} />
      <Title level={4} style={{ marginTop: 0 }}>
        Все домашние работы
      </Title>
      <Button style={{ marginBottom: 20 }} type="primary" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }}>Добавить</Button>
      <Table columns={createdHomeworks} dataSource={contests} />
    </>
  );
};

export default AdminHomeWork;
