import React, { useEffect, useState } from "react";
import { Tabs, Typography } from "antd";
import AchivmentsList from "../Components/AchivmentsList";
import { getUserAchievements } from "../api";
import { LoadingBar } from "../Components/Loading";
import { PlusOutlined } from "@ant-design/icons";
import AddAchivment from "../Components/AddAchivment";
import useDocumentTitle from "../useDocumentTitle";
import SystemAchivmentsList from "../Components/SystemAchivmentsList";

const { Title } = Typography;

const Achivments = () => {
  useDocumentTitle("Ваши достижения | ШТП");
  const [achivmentsBlock, setAchivmentsBlock] = useState(
    <LoadingBar align="center" size={24} />
  );

  const [systemAchievementsBlock, setSystemAchievementsBlock] = useState(
    <LoadingBar align="center" size={24} />
  );
  useEffect(() => {
    getUserAchievements(
      (resp) => {
        setAchivmentsBlock(
          <AchivmentsList achivments={resp.data.achievements.base} />
        );
        setSystemAchievementsBlock(
          <SystemAchivmentsList
            system_achivments={resp.data.achievements.system}
          />
        );
        
      },
      () => {}
    );
  }, []);
  const tabs = [
    { label: "Олимпиады & Конкурсы", key: "item-1", children: achivmentsBlock },
    { label: "Мероприятия", key: "item-2", children: "Content 2" },
    {
      label: "Системные",
      key: "item-3",
      children: systemAchievementsBlock,
    },
    {
      label: (
        <>
          <PlusOutlined />
          Добавить
        </>
      ),
      key: "item-4",
      children: <AddAchivment />,
    },
  ];

  return (
    <>
      <Title level={3}>Ваши достижения</Title>
      <Tabs items={tabs} />
    </>
  );
};

export default Achivments;
