import React from "react";
import { Typography } from "antd";

const { Title } = Typography;


const AdminUsers = () => {
  return (
    <>
      <Title level={4}>Пользователи</Title>
      <div>Users table + create user form + multiple users creation</div>
    </>
  );
};

export default AdminUsers;
