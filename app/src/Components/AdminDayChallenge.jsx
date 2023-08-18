import React, { useState } from "react";
import { Typography, Table, Button, Space, Select, Modal, message } from "antd";
import NameAndAvatar from "./NameAndAvatar";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskCard from "./CreateTaskCard";
import { useEffect } from "react";
import { API } from "../api";

const { Title, Text } = Typography;

const fetch = (value, callback) => {
  API({
    endpoint: `/assigments/tasks/search?query=${value}`, ok: (resp) => {
      console.log(resp.data);
      callback(resp.data.map(task => ({
        value: task.title,
        label: task.uuid
      })))
    }
  })
};

const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
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
      fio: <NameAndAvatar user_id={1} name={"Stephan Zhdanov"} avatar={"1_avatar.png"} />,
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
  useEffect(() => {
    API({
      endpoint: "/assigments/tasks/challenge", ok: (resp) => {
        SetCurrentDayChallenge(resp.data);
      }
    });
  }, []);
  const [currentDayChallenge, SetCurrentDayChallenge] = useState({});
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
        <CreateTaskCard messageApi={messageApi} />
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
        />
      </Space>
      <Space>
        <Button type="primary">Сделать задачей дня</Button>
        <Button type="dashed" icon={<PlusOutlined />} onClick={() => { setCreateTaskModalOpen(true); }}>
          Добавить новую задачу
        </Button>
      </Space>
    </>
  );
};

export default AdminDayChallenge;
