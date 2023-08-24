import React, {useContext, useEffect, useState} from "react";
import { Tabs, Typography } from "antd";
import AdminUsers from "../Components/AdminUsers";
import AdminSystem from "../Components/AdminSystem";
import AchivmentsModeration from "../Components/AdminModeration";
import { NotFound } from "./NotFound";
import AdminDayChallenge from "../Components/AdminDayChallenge";
import AdminHomeWork from "../Components/AdminHomeWork";
import AdminTasks from "../Components/AdminTasks";
import useDocumentTitle from "../useDocumentTitle";
import AdminNotifications from "../Components/AdminNotifications";
import userContext from "../Contexts/user";
import AdminEvents from "../Components/AdminEvents";

const { Title } = Typography;

export const Admin = () => {
  const { userInfo, loading, loggedIn } = useContext(userContext);
  const [currentTab, setCurrentTab] = useState("users");
  useDocumentTitle("ШТП | Админ-панель");
  // check permisiions to access this page
  if (userInfo.role === "teacher" || userInfo.role === "admin") {
    return (
      <>
        <Title level={3}>Панель администратора</Title>
        <Tabs
          onChange={(key) => {setCurrentTab(key)}}
          defaultActiveKey="users"
          items={[
            {
              label: "Пользователи",
              key: "users",
              children: <AdminUsers currentTab={currentTab}/>,
            },
            {
              label: "Достижения",
              key: "achievements",
              children: <AchivmentsModeration currentTab={currentTab}/>,
            },
            {
              label: "Задача дня",
              key: "dayChallenge",
              children: <AdminDayChallenge currentTab={currentTab}/>,
            },
            {
              label: "Домашние работы",
              key: "homeWorks",
              children: <AdminHomeWork currentTab={currentTab}/>,
            },
            {
              label: "Задачи",
              key: "tasks",
              children: <AdminTasks currentTab={currentTab}/>,
            },
            {
              label: "Мероприятия",
              key: "events",
              children: <AdminEvents />,
            },
            {
              label: "Уведомления",
              key: "notifications",
              children: <AdminNotifications />,
            },
            {
              label: "Настройки ШТП",
              key: "settings",
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

