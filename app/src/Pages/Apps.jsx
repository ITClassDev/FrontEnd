import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMyApps } from "../api";
import { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import CreateAppModal from "../Components/CreateAppModal";
import EditAppModal from "../Components/EditAppModal";
import { Alert, Button, Space, Table, Typography } from "antd";
import useDocumentTitle from "../useDocumentTitle";

const { Title } = Typography;

const AppsActionsBtns = ({ app_id, setEditModal }) => {
  return (
    <Space direction="horizontal">
      <Button
        type="primary"
        onClick={() => {
          setEditModal(true);
        }}
      >
        Редактировать
      </Button>
    </Space>
  );
};

const Apps = () => {
  useDocumentTitle("ШТП | Приложения");
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
  const updateAppsTable = () => {
    getMyApps(
      (response) => {
        let apps = [];
        response.data.forEach((app) => {
          apps.push({
            id: <Link to={`/login_to?app_id=${app.id}`}>{app.id}</Link>,
            key: app.id,
            title: app.name,
            redirect_url: app.redirect_url,
            status: app.status ? "Неактивно" : "Активно",
            actions: (
              <AppsActionsBtns
                app_id={app.id}
                setEditModal={setEditModalOpened}
              />
            ),
          });
        });
        setAppsData(apps);
      },
      () => {}
    );
  };
  useEffect(() => {updateAppsTable()}, []);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);

  return (
    <>
      <CreateAppModal
        modalOpened={createModalOpened}
        setModalOpened={setCreateModalOpened}
        updateAppsTable={updateAppsTable}
      />
      <EditAppModal
        modalOpened={editModalOpened}
        setModalOpened={setEditModalOpened}
      />
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
            </ul>
            Ознакомиться с документацией можно в{" "}
            <Link to={"/docs"}>разделе OAuth в документации к API</Link>
          </>
        }
        type="info"
      />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => setCreateModalOpened(true)}
      >
        Создать новое
      </Button>
      <Table
        columns={columnsMyAppsTable}
        style={{ marginTop: 10 }}
        dataSource={appsData}
      />
    </>
  );
};

export default Apps;
