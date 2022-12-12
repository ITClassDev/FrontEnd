import React, { useEffect, useState } from "react";
import { STORAGE } from "../config";
import { Card, Table, Avatar } from 'antd';
import { Typography } from 'antd';
import { getLeaderBoard } from "../api";
const { Text } = Typography;


const LeaderBoard = () => {
    const columns = [{title: "#", dataIndex: "number", key: "number"}, {title: "Ученик", dataIndex: "user_name", key: "user_name"}, {title: "Рейтинг", dataIndex: "rating", key: "rating"}];
    const [ratingUsers, setRatingUsers] = useState([]); //{number: 1, user_name: <><Avatar src={`${STORAGE}/avatars/${"1_avatar.png"}`} style={{ verticalAlign: 'middle', marginRight: 10 }} size="large"></Avatar><Text strong>Zhdanov Stephan</Text></>, rating: 100}
    useEffect(() => {getLeaderBoard((resp) => {
        let res = [];
        resp.data.forEach((element, ind) => {
            if (element.rating !== 0) // ignore users withput rating(zero rating)
                res.push({number: ind + 1, user_name: <><Avatar src={`${STORAGE}/avatars/${element.userAvatarPath}`} style={{ verticalAlign: 'middle', marginRight: 10 }} size="large"></Avatar><Text strong>{element.firstName} {element.lastName}</Text></>, rating: element.rating, key: ind});
        });
        setRatingUsers(res);
    }, () => {})}, []);
    return (
        <Card title="ТОП по рейтингу" bordered={false}>
            <Table columns={columns} dataSource={ratingUsers} />
        </Card>
    );
}

export default LeaderBoard; 