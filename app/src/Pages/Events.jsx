import React from "react";
import { Tabs, Typography } from "antd";
import StudyEvents from "../Components/StudyEvents";

const { Title } = Typography;

const Events = () => {
  return (
    <>
      <Title level={3}>Мероприятия</Title>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Обучение (get from profil.mos.ru graphql)",
            key: "1",
            children: <StudyEvents/>,
          },
          {
            label: "Соревнования",
            key: "2",
            children: <></>,
          },
          {
            label: "Школьные",
            key: "3",
            children: <></>,
          },
        ]}
      />
    </>
  );
};

export default Events;
