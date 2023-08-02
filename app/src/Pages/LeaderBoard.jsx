import React, { useEffect, useState } from "react";
import { config } from "../config";
import { Card, Table } from "antd";
import { API } from "../api";
import ProfileLink from "../Components/ProfileLink";

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
          user: <ProfileLink user={element} storage={STORAGE} />,
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


