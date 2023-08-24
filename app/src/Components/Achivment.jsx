import Card from "antd/es/card/Card";
import { Space, Typography } from "antd";
import {
  StarFilled,
  GlobalOutlined,
  FileDoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { convertDate } from "../api";

const { Text } = Typography;

const Achivment = ({ title, points, desc, date }) => {
  return (
    <Card
      title={title}
      bordered={true}
      style={{ width: 300, marginRight: "20px", marginBottom: "20px" }}
    >
      <Space direction="vertical">
        {desc}
        <hr />
        <Text>
          <StarFilled /> {points}
        </Text>
        <Text>
          <GlobalOutlined /> Информация
        </Text>
        <Text>
          <FileDoneOutlined /> Диплом
        </Text>
        <Text>
          <ClockCircleOutlined /> {convertDate(date)}
        </Text>
      </Space>
    </Card>
  );
};

export default Achivment;
