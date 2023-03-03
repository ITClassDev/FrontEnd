import React from "react";
import { Card, Space, Typography } from "antd";

const { Text } = Typography;

const SystemAchivment = ({ title, desc, medal }) => {
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: 300,
        marginRight: "20px",
        marginBottom: "20px",
        textAlign: "center1",
      }}
    >
      <Space direction="horizontal">
        {medal}
        <Text strong>{desc}</Text>
      </Space>
    </Card>
  );
};

export default SystemAchivment;
