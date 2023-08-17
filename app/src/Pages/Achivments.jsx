import React, { useEffect, useState } from "react";
import { Tabs, Typography } from "antd";
import AchivmentsList from "../Components/AchivmentsList";
import { API } from "../api";
import { LoadingBar } from "../Components/Loading";
import { PlusOutlined } from "@ant-design/icons";
import AddAchivment from "../Components/AddAchivment";
import useDocumentTitle from "../useDocumentTitle";
import SystemAchivmentsList from "../Components/SystemAchivmentsList";

const { Title } = Typography;

export const Achivments = () => {
  useDocumentTitle("ШТП | Ваши достижения");
  const [achivmentsBlock, setAchivmentsBlock] = useState(
    <LoadingBar align="center" size={24} />
  );

  const [systemAchievementsBlock, setSystemAchievementsBlock] = useState(
    <LoadingBar align="center" size={24} />
  );
  useEffect(() => {

    API({
      endpoint: "/achievements", ok: (resp) => {
        // setSystemAchievementsBlock(
        //   <SystemAchivmentsList
        //     system_achivments={resp.data.achievements.system}
        //   />)
          setAchivmentsBlock(
            <AchivmentsList achivments={resp.data} />
          );
  

      }});

  }, []);
  const tabs = [
    { label: "Все", key: "item-1", children: achivmentsBlock },
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

