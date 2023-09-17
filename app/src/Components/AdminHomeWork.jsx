import { Button, Table, Typography, Tag, Space, message } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CreateNewContestModal from "./CreateNewContestModal";
import { API, convertDateAndTime } from "../api";
import { ContestStatistic } from "./ContestStatistic";

const { Title } = Typography;


const AdminHomeWork = ({ currentTab }) => {
  const [createContestModal, setCreateTaskModalOpen] = useState(false);
  const [contests, setContests] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [showStatistics, setShowStatistics] = useState(false);
  const [contestData, setContestData] = useState({});
  const [loading, setLoading] = useState(false);
  const [statisticsContest, setStatisticsContest] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
        getAllContest();
      }
    });

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
          <Button type="primary" onClick={() => { setStatisticsContest(record.key); setShowStatistics(true) }}>Статистика</Button>
          <Button type="dashed" loading={loading} onClick={() => { 
            setLoading(true);
            API({
              endpoint: `/assigments/contests/${record.key}`,
              ok: (resp) => {
                setContestData(resp.data);
                setCreateTaskModalOpen(true);
                setLoading(false);
              }
            })
           }}>Редактировать</Button>
        </Space>
      )
    },
  ];

  return (
    <>
      {contextHolder}
      <ContestStatistic contestId={statisticsContest} show={showStatistics} onClose={() => { setShowStatistics(false) }} />
      <CreateNewContestModal defaults={contestData} open={createContestModal} setModalOpened={setCreateTaskModalOpen} userGroups={userGroups} onCreate={(form_data, userGroupsInput, userClassInput, tasksSelected, deadlineInput) => {
        API({
          endpoint: "/assigments/contests", method: "put", data: {
            tasks: tasksSelected.map(task => (task.value)),
            forGroups: userGroupsInput,
            title: form_data.contest_name,
            description: form_data.contest_description,
            deadline: deadlineInput.substring(0, deadlineInput.length - 5),
            forLearningClass: userClassInput,
            mark5: form_data.mark5,
            mark4: form_data.mark4,
            mark3: form_data.mark3
          }, ok: () => {
            load(); setCreateTaskModalOpen(false);
          }, message: { show: true, api: messageApi, ok: "Контест создан", err: "Контест не создан" }
        })

      }} />
      <Title level={4} style={{ marginTop: 0 }}>
        Все домашние работы
      </Title>
      <Button style={{ marginBottom: 20 }} type="primary" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }}>Добавить</Button>
      <Table columns={createdHomeworks} dataSource={contests} />
    </>
  );
};

export default AdminHomeWork;
