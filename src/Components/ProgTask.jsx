import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { Descriptions, Table } from "antd";
import SendTask from "./SendTask";
import MyAttempts from "./MyAttempts";
import { getTaskSubmits, convertDateAndTime } from "../api";

const { Text } = Typography;

const ProgTask = ({
  title,
  desc,
  tests,
  time_limit,
  memory_limit,
  task_id,
  can_submit = true,
}) => {
  const getSubmissions = () => {
    getTaskSubmits(
      task_id,
      (response) => {
        let result = [];
        response.data.forEach((submission) => {
          result.push({
            key: submission.id,
            id: submission.id,
            date: convertDateAndTime(submission.send_date),
            lang: { py: "Python 3.10.6", cpp: "GCC 10.2.1" }[
              submission.source.split(".").at(-1)
            ],
            status: submission.solved ? (
              <Text code type="success">
                OK
              </Text>
            ) : submission.status === 2 ? (
              <Text code type="danger">
                NO
              </Text>
            ) : (
              "Checking..."
            ),
          });
        });
        setAttempts(result);
      },
      (response) => {}
    );
  };
  useEffect(() => {
    getSubmissions();
  }, []);

  const columns = [
    { title: "Вход", dataIndex: "input", key: "input" },
    { title: "Выход", dataIndex: "output", key: "output" },
  ];
  const [attempts, setAttempts] = useState();

  return (
    <>
      <Card title={title} style={{ marginBottom: 20 }}>
        <Descriptions title="Лимиты" bordered style={{ marginBottom: "20px" }}>
          <Descriptions.Item label="Время">
            <b>{time_limit} секунд</b>
          </Descriptions.Item>
          <Descriptions.Item label="Память">
            <b>{memory_limit} КБ</b>
          </Descriptions.Item>
        </Descriptions>
        <h3>Текст задачи</h3>
        {desc}
        <h3>Примеры тестов</h3>
        <Table
          dataSource={tests}
          columns={columns}
          style={{ whiteSpace: "pre" }}
        />
      </Card>

      {can_submit && <SendTask task_id={1} getSubmissions={getSubmissions} />}
      {can_submit && <MyAttempts attempts={attempts} getSubmissions={getSubmissions}/>}
    </>
  );
  /* Reactions
                <h3>Оцените задачу</h3>
                <Rate/>

    */
};

export default ProgTask;
