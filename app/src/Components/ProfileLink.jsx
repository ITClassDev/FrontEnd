import React from "react";
import { Avatar, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

const ProfileLink = ({ user, storage, target = "" }) => {
    let user_id = user.uuid ? user.uuid : user.userId;
    return (
        <Link to={`/u/${(user.nickName) ? user.nickName : user_id}`} target={target}>
            <Avatar
                src={`${storage}/avatars/${user.avatarPath}`}
                style={{ verticalAlign: "middle", marginRight: 10 }}
                size="large"
            />
            <Text strong>
                {user.firstName} {user.lastName}
            </Text>
        </Link>
    )
}

export default ProfileLink;