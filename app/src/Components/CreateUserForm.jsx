import React from "react";
import { InputNumber, Form, Select, Input, Button } from "antd";

const { Option } = Select;

const CreateUserForm = ({ createUserFormHandler, userGroups }) => {
  return (
    <Form
      name="create_user"
      requiredMark={false}
      className="create-user-form"
      onFinish={createUserFormHandler}
      layout="vertical"
    >
      <Form.Item
        name="firstName"
        label="Имя"
        rules={[
          {
            required: true,
            message: "Введите имя",
          },
        ]}
      >
        <Input placeholder="Иван" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Фамилия"
        rules={[
          {
            required: true,
            message: "Введите фамилию",
          },
        ]}
      >
        <Input placeholder="Иванов" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Введите email",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Введите пароль",
          },
        ]}
      >
        <Input placeholder="Пароль" />
      </Form.Item>

      <Form.Item
        name="role"
        label="Роль"
        rules={[
          {
            required: true,
            message: "Выберите роль",
          },
        ]}
      >
        <Select>
          <Option value={"student"}>Ученик</Option>
          <Option value={"teacher"}>Преподаватель</Option>
          <Option value={"admin"}>Администратор</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="learningClass"
        label="Класс обучения"
        rules={[
          {
            required: true,
            message: "Введите класс обучения",
          },
        ]}
      >
        <InputNumber min={5} max={11} />
      </Form.Item>
      <Form.Item
        name="groupId"
        label="Группа пользователя"
        rules={[
          {
            required: true,
            message: "Выберите группу пользователя",
          },
        ]}
      >
        <Select
          options={userGroups.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
