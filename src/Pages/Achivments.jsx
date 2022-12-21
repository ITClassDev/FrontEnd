import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import AchivmentsList from "../Components/AchivmentsList";
import { getUserAchievements } from "../api";
import { LoadingHorizCenter } from "../Components/Loading";
import { PlusOutlined } from "@ant-design/icons";
import AddAchivment from "../Components/AddAchivment";
import useDocumentTitle from "../useDocumentTitle";
import SystemAchivmentsList from "../Components/SystemAchivmentsList";

const Achivments = () => {
  useDocumentTitle("Ваши достижения | ШТП");
  const test_sys_ach = [0, 1, 2, 3, 4, 5, 6, 7];
  const [achivmentsBlock, setAchivmentsBlock] = useState(
    <LoadingHorizCenter />
  );
  useEffect(() => {
    getUserAchievements(
      (resp) => {
        setAchivmentsBlock(
          <AchivmentsList achivments={resp.data.achievements} />
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
      children: <SystemAchivmentsList system_achivments={test_sys_ach} />,
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
      <h1>Ваши достижения</h1>
      <Tabs items={tabs} />
    </>
  );
};

export default Achivments;
