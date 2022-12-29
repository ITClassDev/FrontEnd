import React from "react";
import { Typography, Table, Button, Space } from "antd";
import NameAndAvatar from "./NameAndAvatar";

const { Title } = Typography;

const AdminDayChallenge = () => {
  const solvedByTableColumns = [
    {
      title: "ID решения",
      dataIndex: "sol_id",
      key: "sol_id",
    },
    {
      title: "Ученик",
      dataIndex: "fio",
      key: "fio",
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];

  // test data
  const solvedByUsers = [
    {
      sol_id: "31213",
      key: "31213",
      fio: <NameAndAvatar user_id={1} name={"Stephan Zhdanov"} />,
      actionsBtns: (
        <Space direction="horizontal">
          <Button type="primary">Код решения</Button>
          <Button type="dashed" danger>
            Отклонить
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        Решившие задачу - {solvedByUsers.length}
      </Title>
      <Table columns={solvedByTableColumns} dataSource={solvedByUsers} />
      <Title level={4} style={{ marginTop: 0 }}>
        Выбрать задачу дня
      </Title>
    </>
  );
};

export default AdminDayChallenge;
