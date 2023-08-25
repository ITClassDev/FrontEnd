import React, { useEffect, useState } from "react";
import { Card, Typography, Space, Button } from "antd";
import { Descriptions, Table } from "antd";
import SendTask from "./SendTask";
import MyAttempts from "./MyAttempts";
import ProfileLink from "./ProfileLink";
import {
  API, convertDateAndTime
} from "../api";
import Parser from "html-react-parser";
import { config } from "../config";

const STORAGE = config.STORAGE;

const { Text } = Typography;

const ProgTask = ({
  title,
  desc,
  tests,
  time_limit,
  memory_limit,
  task_id = null,
  contest_id = null,
  can_submit = true,
}) => {
  const fetchLeaderBoard = () => {
    API({
      endpoint: "/assigments/tasks/challenge/leaderboard", ok: (resp) => {
        setSolvedByUsers(resp.data.map(item => ({
          id: item.userId,
          key: item.userId,
          fio: "1",
          user: { ...item, uuid: item.userId },
          date: item.created_at
        })));
      }
    })
  }

  const getSubmissions = () => {
    API({
      endpoint: "/assigments/tasks/challenge/submits", ok: (resp) => {
        setAttempts(resp.data.map(submit => ({
          key: submit.uuid,
          id: submit.uuid,
          date: submit.created_at,
          lang: { py: "Python 3.10.6", cpp: "GCC 10.2.1" }[
            submit.source.split(".").at(-1)
          ],
          solved: submit.solved,
          status: submit.status,
          source: submit.source
        })))
      }
    });
    fetchLeaderBoard();
  };

  const getSubmissionsContest = () => {
    API({
      endpoint: `/assigments/contests/${contest_id}/task/${task_id}/submits`, ok: (resp) => {
        setAttempts(resp.data.map(submit => ({
          key: submit.uuid,
          id: submit.uuid,
          date: submit.created_at,
          lang: { py: "Python 3.10.6", cpp: "GCC 10.2.1" }[
            submit.source.split(".").at(-1)
          ],
          solved: submit.solved,
          status: submit.status,
          source: submit.source
        })))
      }
    });
  };

  useEffect(() => {
    if (can_submit) getSubmissions();
    else getSubmissionsContest();
  }, []);

  const columns = [
    { title: "Вход", dataIndex: "input", key: "input" },
    { title: "Выход", dataIndex: "output", key: "output" },
  ];
  const [attempts, setAttempts] = useState();
  const [solvedByUsers, setSolvedByUsers] = useState([]);
  const solvedByTableColumns = [
    {
      title: "Дата и время",
      dataIndex: "date",
      key: "date",
      render: (_, record) => convertDateAndTime(record.date)
    },
    {
      title: "Ученик",
      dataIndex: "fio",
      key: "fio",
      render: (_, record) => <ProfileLink user={record.user} storage={STORAGE} />
    }
  ];

  return (
    <>
      <Card title={title} style={{ marginBottom: 20 }}>
        <Descriptions title="Лимиты" bordered style={{ marginBottom: 20 }}>
          <Descriptions.Item label="Время">
            <b>{time_limit} секунд</b>
          </Descriptions.Item>
          <Descriptions.Item label="Память">
            <b>{memory_limit} КБ</b>
          </Descriptions.Item>
        </Descriptions>
        <h3>Текст задачи</h3>
        {Parser(desc)}
        <h3>Примеры тестов</h3>
        <Table
          dataSource={tests}
          columns={columns}
          style={{ whiteSpace: "pre" }}
        />
      </Card>

      {can_submit && <SendTask task_id={1} getSubmissions={getSubmissions} />}
      {can_submit ? (
        <>
          <MyAttempts attempts={attempts} getSubmissions={getSubmissions} />
          <Card title="Лидерборд" style={{ marginBottom: 20 }}>
            <Table columns={solvedByTableColumns} dataSource={solvedByUsers} />
          </Card>
        </>
      ) : (
        <MyAttempts
          attempts={attempts}
          getSubmissions={getSubmissionsContest}
        />
      )}
      <Card title="Комментарии">

      </Card>
    </>
  );
  /* Reactions
                <h3>Оцените задачу</h3>
                <Rate/>

    */
};

export default ProgTask;
