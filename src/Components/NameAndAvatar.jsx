import React from "react";
import { STORAGE } from "../config";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "antd";

const { Text } = Typography;

const NameAndAvatar = ({user_id, name}) => {
  return (
    <Link to={`/profile?id=${user_id}`}>
      <Avatar
        src={`${STORAGE}/avatars/${user_id}_avatar.png`}
        style={{ verticalAlign: "middle", marginRight: 10 }}
        size="large"
      ></Avatar>
      <Text strong>{name}</Text>
    </Link>
  );
};

export default NameAndAvatar;
