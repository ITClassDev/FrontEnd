import React from "react";
import { Card, Progress, Tag, Typography, Space, Button } from "antd";
import { convertDateAndTime } from "../api";
const { Text } = Typography;

const HomeTaskCard = ({
  title,
  tag,
  complited_percent,
  description,
  uuid,
  deadline
}) => {
  const task_tags_mapping = {
    easy: <Tag color="green">Easy</Tag>,
    middle: <Tag color="lime">Middle</Tag>,
    senior: <Tag color="orange">Senior</Tag>,
    impossible: <Tag color="red">Impossible</Tag>,
  };
  return (
    <Card
      title={title}
      bordered={false}
      extra={task_tags_mapping[tag]}
      style={{ marginBottom: 20 }}
    >
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Text strong>Прогресс по задачам</Text>
        <Progress percent={complited_percent} />
        <Text strong>Описание</Text>
        <Text>{description}</Text>
        <Text strong>Дедлайн</Text>
        <Text>{convertDateAndTime(deadline)}</Text>
        <Button type="primary" href={`/contests/${uuid}`}>Открыть задачи</Button>
      </Space>
    </Card>
  );
};

export default HomeTaskCard;
