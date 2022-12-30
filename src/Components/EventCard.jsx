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
  event_id,
  title,
  organizer,
  audience,
  seats_available,
  event_date,
  start_time,
  finish_time
}) => {
  const dateStartProcessed = new Date(event_date).toLocaleString("ru-RU");
  const startTimeObj = new Date(start_time);
  const finishTimeObj = new Date(finish_time);

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
          <CalendarOutlined /> Дата проведения:{" "}
          <Text strong>{dateStartProcessed}</Text>
        </Text>
        <Text>
          <ClockCircleOutlined /> Длительность:{" "}
          <Text strong>
            {(finishTimeObj - startTimeObj) / 60 / 60 / 1000} час
          </Text>
        </Text>
        <Space direction="horizontal">
          <Button type="primary" style={{ marginTop: 20 }} target={"__blank"} href={`https://profil.mos.ru/events/event/${event_id}`}>
            Зарегистрироваться
          </Button>
          <Button style={{ marginTop: 20 }}>Добавить в график</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default EventCard;
