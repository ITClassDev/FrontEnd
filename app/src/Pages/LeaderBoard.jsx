import React, { useEffect, useState } from "react";
import { config } from "../config";
import { Card, Table, Avatar } from "antd";
import { Typography } from "antd";
import { API, getLeaderBoard } from "../api";
import { Link } from "react-router-dom";
const { Text } = Typography;
const STORAGE = config.STORAGE;

export const LeaderBoard = () => {
  const columns = [
    { title: "#", dataIndex: "number", key: "number" },
    { title: "Ученик", dataIndex: "user", key: "user" },
    { title: "Рейтинг", dataIndex: "rating", key: "rating" },
  ];
  const [ratingUsers, setRatingUsers] = useState([]);
  useEffect(() => {
    API({
      endpoint: "/users/leaderboard", ok: (response) => {
        setRatingUsers(response.data.map((element, ind) => ({
          number: ind + 1,
          user: (
            <Link to={`/profile?id=${element.uuid}`}>
              <Avatar
                src={`${STORAGE}/avatars/${element.avatarPath}`}
                style={{ verticalAlign: "middle", marginRight: 10 }}
                size="large"
              />
              <Text strong>
                {element.firstName} {element.lastName}
              </Text>
            </Link>
          ),
          rating: element.rating,
          key: ind,
        })));
      }
    })

  }, []);
  return (
    <Card title="ТОП по рейтингу" bordered={false}>
      <Table columns={columns} dataSource={ratingUsers} />
    </Card>
  );
};


