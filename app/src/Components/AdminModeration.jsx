import React from "react";
import { Typography, Table, Button } from "antd";
import { useEffect } from "react";
import { convertDate, API } from "../api";
import { config } from "../config";
import { useState } from "react";
import AdminModerateAchivmentModal from "./AdminModerateAchivmentModal";
import ProfileLink from "./ProfileLink";

const STORAGE = config.STORAGE;
const { Title } = Typography;

const AchivmentsModeration = ({ currentTab }) => {
  const moderationColumns = [
    {
      title: "Ученик",
      dataIndex: "student",
      key: "student",
      render: (_, record) => (
        <ProfileLink user={record.student} storage={STORAGE} />
      )
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Добавлено",
      dataIndex: "moderation_date",
      key: "moderation_date",
      render: (_, record) => (
        convertDate(record.moderation_date)
      )
    },
    {
      title: "Действиия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setModerationAchivmentText(record.description);
            setModerationAchivmentId(record.uuid);
            setModerationAchivmentAttachment(record.attachmentName)
            setModerationModalOpen(true);
          }}
        >
          Открыть
        </Button>
      )
    },
  ];
  const [moderationQueue, setModerationQueue] = useState();
  const [moderationModalOpen, setModerationModalOpen] = useState(false);
  const [moderationAchivmentText, setModerationAchivmentText] = useState();
  const [moderationAchivmentId, setModerationAchivmentId] = useState();
  const [moderationAchivmentAttachment, setModerationAchivmentAttachment] = useState();
  const load = () => {
    API({
      endpoint: "/achievements/queue", ok: (response) => {
        setModerationQueue(response.data.map((achiv) => ({
          student: achiv.User, key: achiv.uuid, title: achiv.title,
          moderation_date: achiv.created_at, description: achiv.description,
          attachmentName: achiv.attachmentName
        })));
      }
    });
  }

  useEffect(() => {
    if (currentTab == "achievements") load();
  }, [currentTab]);

  return (
    <>
      <AdminModerateAchivmentModal
        isOpen={moderationModalOpen}
        setOpen={setModerationModalOpen}
        achivmentText={moderationAchivmentText}
        achivmentId={moderationAchivmentId}
        achivmentAttachment={moderationAchivmentAttachment}
        moderationQueue={moderationQueue}
        setModerationQueue={setModerationQueue}
      />
      <Title level={4} style={{ marginTop: 10, marginBottom: 20 }}>
        Очередь модерации
      </Title>
      <Table columns={moderationColumns} dataSource={moderationQueue} />
      <Title level={4} style={{ marginTop: 0 }}>
        Все достижения
      </Title>
      DEV
    </>
  );
};

export default AchivmentsModeration;
