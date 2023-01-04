import React from "react";
import { Alert, Button, Space, Typography } from "antd";
import { useEffect } from "react";
import { getMyNotifications } from "../api";
import { useState } from "react";

const { Title } = Typography;

const Notifications = () => {
  /*[
    {
      title: "Реклама",
      desc: "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
      type: "warning",
    },
    {
      title: "Реклама",
      desc: "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
      type: "error",
    },
    {
      title: "Реклама",
      desc: "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
      type: "info",
    },
  ];*/
  const [notifications, setNotifications] = useState([]);
  const ALL_NOTIFICATIONS = [
    {
      title: "Новое достижение!",
      base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
      color: "success",
    },
    {
      base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
      color: "error",
    },
    {
      base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
      color: "info",
    },
    {
      base: "Ваше достижение {name} прошло модерацию! Начислено {points} баллов",
      color: "success",
    },
  ];
  useEffect(() => {
    getMyNotifications(
      (response) => {
        setNotifications(
          <>
            {response.data.map((notify, ind) => (
              <Alert
                message={<span style={{ fontWeight: "bold" }}>{"FFF"}</span>}
                key={ind}
                description={ALL_NOTIFICATIONS[notify.type].base.replace(
                  /{(\w+)}/g,
                  (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
                    notify.data[placeholderWithoutDelimiters] ||
                    placeholderWithDelimiters
                )}
                type={ALL_NOTIFICATIONS[notify.type].color}
                style={{ marginBottom: "20px" }}
                action={
                  <Space direction="vertical">
                    <Button size="small" type="primary">
                      Подробнее
                    </Button>
                  </Space>
                }
              />
            ))}
          </>
        );
      },
      () => {}
    );
  }, []);
  return (
    <>
      <Title level={3}>Уведомления</Title>
      {notifications}
    </>
  );
};

export default Notifications;
