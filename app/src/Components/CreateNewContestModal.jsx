import React, { useState, useEffect } from "react";
import { Modal, Space, Typography, Form, Input, Button, Select, DatePicker } from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { API } from "../api";

const { Text } = Typography;

const CreateNewContestModal = ({ open, setModalOpened }) => {
  const createContestHandler = (form_data) => {
    console.log(form_data);
  }

  const SearchInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
      API({
        endpoint: `/programming/tasks/search`, data: { query: newValue }, method: 'POST', ok: (response) => {
          if (response.data.length > 0) setData(response.data.map(item => ({ value: item.id, text: item.title })));
          else setData([]);
        }
      })

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
        mode={"multiple"}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
      />
    );
  };


  useEffect(() => {

  }, [])


  return (
    <Modal
      title="Новый контест"
      transitionName=""
      open={open}
      footer={<></>}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
    >
      <Form name="create_contest" className="create-contest-form" onFinish={createContestHandler}>
        <Form.Item
          name="contest_name"
          rules={[
            {
              required: true,
              message: "Введите название контеста",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Название контеста</Text>
            <Input placeholder="Название" />
          </Space>
        </Form.Item>
        <Form.Item
          name="contest_description"
          rules={[
            {
              required: true,
              message: "Введите описание контеста",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Описание контеста</Text>
            <Input placeholder="Короткое описание" />
          </Space>
        </Form.Item>
        <Form.Item
          name="tasks"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Задачи в контесте</Text>
            <SearchInput />
          </Space>
        </Form.Item>

        <Form.Item
          name="user_groups"
          rules={[
            {
              required: true,
              message: "Выберите группы пользователей",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Группы пользователей</Text>
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
            />
          </Space>
        </Form.Item>

        <Form.Item
          name="deadline"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Дата окончания</Text>
            <DatePicker locale={locale} />
          </Space>

        </Form.Item>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNewContestModal;
