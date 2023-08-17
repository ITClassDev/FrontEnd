import { Button, InputNumber, Modal, Space, Typography, Image } from "antd";
import React from "react";
import { useState } from "react";
import { API, moderateAchivment } from "../api";
import { config } from "../config";

const STORAGE = config.STORAGE;

const { Text, Link } = Typography;



const AdminModerateAchivmentModal = ({
  isOpen,
  setOpen,
  achivmentText,
  achivmentId,
  achivmentAttachment,
  moderationQueue,
  setModerationQueue
}) => {
  const moderate = (achivmentId, status, points, setOpenModal) => {
    console.log(moderationQueue);
    
    
    API({
      endpoint: "/achievements/moderate", method: "patch", data: {
        status: status,
        uuid: achivmentId,
        points: points
      }
    });
    setModerationQueue(moderationQueue.filter(achiv => achiv.id != achivmentId));
    setOpenModal(false);
    
  };

  const [pointForAchivment, setPointsForchivment] = useState(10);
  return (
    <Modal
      title="Достижение"
      transitionName=""
      open={isOpen}
      onCancel={() => {
        setOpen(false);
      }}
      footer={<></>}
    >
      <Space direction="vertical">
        <Text strong>Описание</Text>
        <Text>{achivmentText}</Text>
        <Text strong>Подтверждение</Text>
        <Image
          src={`${STORAGE}/achievements/${achivmentAttachment}`}
        />
        <Link
          href={`${STORAGE}/achievements/${achivmentAttachment}`}
          target={"_blank"}
        >
          Диплом/подтверждение
        </Link>
        <Text strong>Количество баллов</Text>
        <InputNumber
          min={1}
          value={pointForAchivment}
          onChange={(points) => {
            setPointsForchivment(points);
          }}
        />
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              moderate(achivmentId, 1, pointForAchivment, setOpen);
            }}
          >
            Принять
          </Button>
          <Button
            danger
            onClick={() => {
              moderate(achivmentId, 0, null, setOpen);
            }}
          >
            Отклонить
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default AdminModerateAchivmentModal;
