import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminUsers from "../Components/AdminUsers";
import AdminSystem from "../Components/AdminSystem";
import AchivmentsModeration from "../Components/AdminModeration";
import NotFound from "./NotFound";


const Admin = ({ user }) => {
  // check permisiions to access this page
  if (user.user.userRole == 2) {
    return (
      <>
        <h1>Админка</h1>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Пользователи",
              key: "1",
              children: <AdminUsers />,
            },
            {
              label: "Модерация",
              key: "2",
              children: <AchivmentsModeration/>,
            },
            {
              label: "Настройки ШТП",
              key: "3",
              children: <AdminSystem />,
            },
          ]}
        />
      </>
    );
  }else{
    return (
        <NotFound/>
    )
  }
};

export default Admin;
