import React from "react";
import { Button, Card, Space, Typography } from "antd";
import {
  LaptopOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const EventCard = ({
  title,
  organizer,
  audience,
  seats_available,
  event_date,
  duration,
}) => {
  const dateStartProcessed = new Date(event_date).toLocaleString("ru-RU");
  return (
    <Card
      title={title}
      bordered={false}
      style={{ width: "100%", marginRight: "20px", marginBottom: "20px" }}
    >
      <Space direction="vertical">
        {organizer}
        <hr />
        <Text>
          <UserOutlined /> <Text strong>{audience}</Text>
        </Text>
        <Text>
          <LaptopOutlined /> Свободно мест:{" "}
          <Text strong>{seats_available}</Text>
        </Text>
        <Text>
          <CalendarOutlined /> Дата проведения: <Text strong>{dateStartProcessed}</Text>
        </Text>
        <Text>
          <ClockCircleOutlined /> Длительность: <Text strong>{duration}</Text>
        </Text>
        <Button type="primary" style={{ marginTop: 20 }}>
          Зарегистрироваться
        </Button>
      </Space>
    </Card>
  );
};

export default EventCard;
