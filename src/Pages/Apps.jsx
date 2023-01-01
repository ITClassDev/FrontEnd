import React from "react";
import { Alert, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMyApps } from "../api";
import { useState } from "react";

const { Title } = Typography;

const Apps = () => {
  const columnsMyAppsTable = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Redirect to",
      dataIndex: "redirect_url",
      key: "redirect_url",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  const [appsData, setAppsData] = useState([]);
  useEffect(() => {
    getMyApps((response) => {
        let apps = [];
        response.data.forEach(app => {
            apps.push({id: app.id, title: app.name, redirect_url: app.redirect_url, status: app.status ? "Неактивно" : "Активно"})
        });
        setAppsData(apps);
    }, () => {})
  }, [])
  
  return (
    <>
      <Title level={3}>OAuth</Title>
      <Alert
        showIcon
        message="Обратите внимание:"
        description={
          <>
            <ul>
              <li>
                Авторизация через ШТП разрешена только для приложений,
                относящихся к школе
              </li>
              <li>
                Приложения становятся работоспособными только после ручной
                модерации
              </li>
              <li>
                Вы не можете создать более 10 приложений (по рофлу добавил
                ограничение)
              </li>
              <li>Ваше приложение должно, просто должно</li>
            </ul>
            Ознакомиться с документацией можно в{" "}
            <Link to={"/docs"}>разделе OAuth в документации к API</Link>
          </>
        }
        type="info"
      />
      <Table columns={columnsMyAppsTable} style={{ marginTop: 20 }} dataSource={appsData}/>
    </>
  );
};

export default Apps;
