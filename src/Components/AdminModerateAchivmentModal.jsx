import { Button, InputNumber, Modal, Space, Typography } from "antd";
import React from "react";
import { useState } from "react";
import { STORAGE } from "../config";

const { Text, Link } = Typography;

const moderate = (status, setOpenModal) => {
  setOpenModal(false);
};

const AdminModerateAchivmentModal = ({ isOpen, setOpen, achivmentText, achivmentId }) => {
  const [pointForAchivment, setPointsForchivment] = useState(10);
  return (
    <Modal
      title="Достижение"
      open={isOpen}
      onCancel={() => {
        setOpen(false);
      }}
      footer={<></>}
    >
      <Space direction="vertical">
        <Text strong>Описание</Text>
        <Text>{achivmentText}</Text>
        <Link href={`${STORAGE}/achievements/${achivmentId}_confirmation_file.png`} target={"_blank"}>
          Диплом/подтверждение
        </Link>
        <Text strong>Количество баллов</Text>
        <InputNumber min={1} value={pointForAchivment} />
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              moderate(1, setOpen);
            }}
          >
            Принять
          </Button>
          <Button
            danger
            onClick={() => {
              moderate(1, setOpen);
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
