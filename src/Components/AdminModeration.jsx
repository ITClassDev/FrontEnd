import React from "react";
import { Typography, Table, Button } from "antd";
import { useEffect } from "react";
import { convertDate, getAchivmentsModerationQueue } from "../api";
import { useState } from "react";
import AdminModerateAchivmentModal from "./AdminModerateAchivmentModal";

const { Title } = Typography;

const AchivmentsModeration = () => {
  const moderationColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "На модерации с",
      dataIndex: "moderation_date",
      key: "moderation_date",
    },
    {
      title: "Действиия",
      dataIndex: "actionsBtns",
      key: "actionsBtns",
    },
  ];
  const [moderationQueue, setModerationQueue] = useState();
  const [moderationModalOpen, setModerationModalOpen] = useState(false);
  const [moderationAchivmentText, setModerationAchivmentText] = useState();
  const [moderationAchivmentId, setModerationAchivmentId] = useState();

  useEffect(() => {
    getAchivmentsModerationQueue(
      (response) => {
        let moderation = [];
        response.data.forEach((moderationItem) => {
          moderation.push({
            id: moderationItem.id,
            key: moderationItem.id,
            title: moderationItem.title,
            moderation_date: convertDate(moderationItem.received_at),
            actionsBtns: (
              <Button
                type="primary"
                onClick={() => {
                  setModerationAchivmentText(moderationItem.description);
                  setModerationAchivmentId(moderationItem.id);
                  setModerationModalOpen(true);
                }}
              >
                Открыть
              </Button>
            ),
          });
        });
        setModerationQueue(moderation);
      },
      () => {}
    );
  }, []);

  return (
    <>
      <AdminModerateAchivmentModal
        isOpen={moderationModalOpen}
        setOpen={setModerationModalOpen}
        achivmentText={moderationAchivmentText}
        achivmentId={moderationAchivmentId}
      />
      <Title level={4} style={{ marginTop: 0 }}>
        Очередь модерации
      </Title>
      <Table columns={moderationColumns} dataSource={moderationQueue} />
    </>
  );
};

export default AchivmentsModeration;
