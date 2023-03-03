import { Button, Table, Typography } from "antd";
import React, {useState} from "react";
import { PlusOutlined } from "@ant-design/icons";
import CreateNewContestModal from "./CreateNewContestModal";

const { Title } = Typography;

/*const HomeWorkActionsBtns = () => {
  return (
    <>
      <Button type="primary">Edit</Button>
    </>
  );
};*/

const AdminHomeWork = () => {
  const [createContestModal, setCreateTaskModalOpen] = useState(false);
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
    },
    {
      title: "Дедлайн",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Действия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];

  return (
    <>
      <CreateNewContestModal open={createContestModal} setModalOpened={setCreateTaskModalOpen}/>
      <Title level={4} style={{ marginTop: 0 }}>
        Все домашние работы
      </Title>
      <Button style={{marginBottom: 20}} type="primary" icon={<PlusOutlined />} onClick={() => {setCreateTaskModalOpen(true);}}>Добавить</Button>
      <Table columns={createdHomeworks} />
    </>
  );
};

export default AdminHomeWork;
