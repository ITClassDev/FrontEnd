import React from "react";
import { Tabs, Typography } from "antd";
import AdminUsers from "../Components/AdminUsers";
import AdminSystem from "../Components/AdminSystem";
import AchivmentsModeration from "../Components/AdminModeration";
import NotFound from "./NotFound";
import AdminDayChallenge from "../Components/AdminDayChallenge";
import AdminHomeWork from "../Components/AdminHomeWork";
import AdminTasks from "../Components/AdminTasks";

const { Title } = Typography;

const Admin = ({ user }) => {
  // check permisiions to access this page
  if (user.user.userRole === 2) {
    return (
      <>
        <Title level={3}>Панель администратора</Title>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Пользователи",
              key: "1",
              children: <AdminUsers />,
            },
            {
              label: "Достижения",
              key: "2",
              children: <AchivmentsModeration />,
            },
            {
              label: "Задача дня",
              key: "3",
              children: <AdminDayChallenge />,
            },
            {
              label: "Домашние работы",
              key: "4",
              children: <AdminHomeWork />,
            },
            {
              label: "Задачи",
              key: "5",
              children: <AdminTasks />,
            },
            {
              label: "Мероприятия",
              key: "6",
              children: <AdminDayChallenge />,
            },
            {
              label: "Уведомления",
              key: "7",
              children: <AdminDayChallenge />,
            },
            {
              label: "Настройки ШТП",
              key: "8",
              children: <AdminSystem />,
            },
          ]}
        />
      </>
    );
  } else {
    return <NotFound />;
  }
};

export default Admin;
