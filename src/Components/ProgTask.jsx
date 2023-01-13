import React from "react";
import { Card } from "antd";
import { Descriptions, Table } from "antd";
import SendTask from "./SendTask";
import MyAttempts from "./MyAttempts";

const ProgTask = ({
  title,
  desc,
  tests,
  time_limit,
  memory_limit,
  task_id,
  can_submit = true,
}) => {
  
  const columns = [
    { title: "Вход", dataIndex: "input", key: "input" },
    { title: "Выход", dataIndex: "output", key: "output" },
  ];
  const attempts = [
    {
      key: 1,
      id: "1012",
      date: "01.12.2022 - 19:03",
      lang: "GNU C++ 17",
      status: <span style={{ color: "green" }}>OK</span>,
      tests: "10/10",
    },
  ];
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

      {can_submit && <SendTask task_id={1} />}
      {can_submit && <MyAttempts attempts={attempts} />}
    </>
  );
  /* Reactions
                <h3>Оцените задачу</h3>
                <Rate/>

    */
};

export default ProgTask;
