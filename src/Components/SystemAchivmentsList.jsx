import React from "react";
import SystemAchivment from "./SystemAchivment";
import { Row } from "antd";
import BronzeMedal from "../Images/Medals/bronze.svg";
import SilverMedal from "../Images/Medals/silver.svg";
import GoldMedal from "../Images/Medals/gold.svg";

const SystemAchivmentsList = ({ system_achivments }) => {
  const ACHIVMENTS_AVAILABLE = [
    {
      id: 0,
      title: "Первый шаг",
      desc: "Наберите 100 баллов рейтинга",
      type: "bronze",
    },
    {
      id: 1,
      title: "Бывалый",
      desc: "Наберите 1000 баллов рейтинга",
      type: "silver",
    },
    {
      id: 2,
      title: "Любитель",
      desc: "Решите 50 задач",
      type: "bronze",
    },
    {
      id: 3,
      title: "На опыте",
      desc: "Решите 100 задач",
      type: "silver",
    },
    {
      id: 4,
      title: "Конкурсант",
      desc: "Решите одну задачу дня",
      type: "bronze",
    },
    {
      id: 5,
      title: "Решала",
      desc: "Решите 50 задач дня",
      type: "silver",
    },
    {
      id: 6,
      title: "Помощник",
      desc: "Отправьте пулл реквест, который будет включён в master tree, в один из репозиториев ШТП",
      type: "gold",
    },
    {
      id: 7,
      title: "Лютый опенсурсер",
      desc: "Отправьте 20 пуллреквестов в ШТП",
      type: "gold",
    },
  ];

  const MEDALS = {
    bronze: <Image src={BronzeMedal} width={30} preview={false} />,
    silver: <Image src={SilverMedal} width={30} preview={false} />,
    gold: <Image src={GoldMedal} width={30} preview={false} />,
  };

  

  return (
    <Row>
      {system_achivments.map((achive, ind) => (
        <SystemAchivment
          title={achive.title}
          desc={achive.description}
          key={achive.id}
        />
      ))}
    </Row>
  );
};

export default SystemAchivmentsList;
