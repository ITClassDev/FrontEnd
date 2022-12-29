import React, { useState } from "react";
import { Typography, Table, Button, Space, Select } from "antd";
import NameAndAvatar from "./NameAndAvatar";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const fetch = (value, callback) => {
  callback([
    {
      value: "1",
      label: "Data",
    },
    {
      value: 2,
      label: "Data 2",
    },
  ]);
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
      <Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>
        Выбрать задачу дня
      </Title>
      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
        <Text strong>
          Текущая задача дня - <Text code>Своп соседей</Text>
        </Text>
        <SearchInput
          placeholder="Поиск задачи по заголовку"
          style={{ width: "100%" }}
        />
      </Space>
      <Space>
        <Button type="primary">Сделать задачей дня</Button>
        <Button type="dashed" icon={<PlusOutlined />}>
          Добавить новую задачу
        </Button>
      </Space>
    </>
  );
};

export default AdminDayChallenge;
