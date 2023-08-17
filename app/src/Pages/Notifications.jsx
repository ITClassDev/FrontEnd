import React, { useContext } from "react";
import { Alert, Typography } from "antd";
import { useEffect } from "react";
import { API } from "../api";
import { useState } from "react";
import { LoadingBar } from "../Components/Loading";
import useDocumentTitle from "../useDocumentTitle";
import { parseNotification } from "../notifications";
import userContext from "../Contexts/user";

const { Title } = Typography;

const Notification = ({ notification }) => (
  <Alert
    message={
      <span style={{ fontWeight: "bold" }}>
        {notification.title}
      </span>
    }
    description={notification.description}
    type={notification.color}
    style={{ marginBottom: "20px" }}
  />

)

export const Notifications = () => {
  const { userInfo, setUser, loading } = useContext(userContext);
  useEffect(() => {
    setUser(({ userInfo: userInfo, loggedIn: true, loading: false, newNotifications: false }));
  }, [])
  const [notifications, setNotifications] = useState(<LoadingBar size={24} />);
  useDocumentTitle("ШТП | Уведомления");
  useEffect(() => {
    API({
      endpoint: "/notifications/all", ok: (response) => {
        setNotifications(
          <>
            {response.data.map((notification) => <Notification notification={parseNotification(notification)} key={notification.uuid} />)}
          </>
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Title level={3}>Уведомления</Title>
      {notifications}
    </>
  );
};

