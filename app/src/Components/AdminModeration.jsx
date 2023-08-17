import React from "react";
import { Typography, Table, Button } from "antd";
import { useEffect } from "react";
import { convertDate, API } from "../api";
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
  const [moderationAchivmentAttachment, setModerationAchivmentAttachment] = useState();

  useEffect(() => {
    API({
      endpoint: "/achievements/queue", ok: (response) => {
        setModerationQueue(response.data.map((achiv) => ({
          id: achiv.uuid, key: achiv.uuid, title: achiv.title, moderation_date: convertDate(achiv.created_at),
          actionsBtns: (
            <Button
              type="primary"
              onClick={() => {
                setModerationAchivmentText(achiv.description);
                setModerationAchivmentId(achiv.uuid);
                setModerationAchivmentAttachment(achiv.attachmentName)
                setModerationModalOpen(true);
              }}
            >
              Открыть
            </Button>
          ),
        })));
      }
    });
  }, []);

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
      <Title level={4} style={{ marginTop: 0 }}>
        Очередь модерации
      </Title>
      <Table columns={moderationColumns} dataSource={moderationQueue} />
    </>
  );
};

export default AchivmentsModeration;
