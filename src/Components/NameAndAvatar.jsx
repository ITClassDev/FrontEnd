import React from "react";
import { STORAGE } from "../config";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "antd";

const { Text } = Typography;

const NameAndAvatar = ({user_id, name, avatar}) => {
  return (
    <Link to={`/profile?id=${user_id}`}>
      <Avatar
        src={`${STORAGE}/avatars/${avatar}`}
        style={{ verticalAlign: "middle", marginRight: 10 }}
        size="large"
      ></Avatar>
      <Text strong>{name}</Text>
    </Link>
  );
};

export default NameAndAvatar;
