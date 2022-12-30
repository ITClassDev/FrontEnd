import React from "react";
import { Tabs } from "antd";
import StudyEvents from "../Components/StudyEvents";

const Events = () => {
  return (
    <>
      <h1>Мероприятия</h1>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Обучение (profil)",
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
