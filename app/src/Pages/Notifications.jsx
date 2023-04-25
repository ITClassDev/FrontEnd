import React from "react";
import { Alert, Typography } from "antd";
import { useEffect } from "react";
import { API } from "../api";
import { useState } from "react";
import { LoadingBar } from "../Components/Loading";
import useDocumentTitle from "../useDocumentTitle";

const { Title } = Typography;

export const Notifications = () => {
  const [notifications, setNotifications] = useState(<LoadingBar size={24} />);
  useDocumentTitle("ШТП | Уведомления");
  const ALL_NOTIFICATIONS = [
    {
      title: "Новое достижение!",
      base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
      color: "success",
    },
    {
      title: "Достижение отклонено",
      base: "Ваше достижение {name} отклонено",
      color: "error",
    },
    {
      title: "Новое мероприятие!",
      base: "Добавлено новое школьное мероприятие - {name}",
      color: "info",
    },
    {
      title: "Новая медаль!",
      base: "Вы получили новую медаль!",
      color: "success",
    },
    {
      title: "Уведомление",
      base: "{text}",
      color: "info"
    },
    {
      title: "Уведомление",
      base: "{text}",
      color: "warning"
    }
  ];
  useEffect(() => {
    API({
      endpoint: "/users/my_notifications", ok: (response) => {
        setNotifications(
          <>
            {response.data.map((notify) => (
              <Alert
                message={
                  <span style={{ fontWeight: "bold" }}>
                    {ALL_NOTIFICATIONS[notify.type].title}
                  </span>
                }
                key={notify.id}
                description={ALL_NOTIFICATIONS[notify.type].base.replace(
                  /{(\w+)}/g,
                  (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
                    notify.data[placeholderWithoutDelimiters] ||
                    placeholderWithDelimiters
                )}
                type={ALL_NOTIFICATIONS[notify.type].color}
                style={{ marginBottom: "20px" }}
              />
            ))}
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

