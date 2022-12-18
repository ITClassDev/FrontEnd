import React from "react";
import {  Tabs } from "antd";
import AdminUsers from "../Components/AdminUsers";
import AdminSystem from "../Components/AdminSystem";

const Admin = () => {
  return (
    <>
      <h1>Админка</h1>
      <Tabs defaultActiveKey="1" items={
        [
            {
                label: "Пользователи",
                key: '1',
                children: <AdminUsers/>
            },
            {
                label: "Достижения",
                key: '2',
                children: ""
            },
            {
                label: "Настройки ШТП",
                key: '3',
                children: <AdminSystem/>
            },
        ]
      }/>
    </>
  );
};

export default Admin;
