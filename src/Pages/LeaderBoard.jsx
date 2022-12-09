import React from "react";
import { STORAGE } from "../config";
import { Card, Table, Avatar } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;


const LeaderBoard = () => {
    const columns = [{title: "#", dataIndex: "number", key: "number"}, {title: "Ученик", dataIndex: "user_name", key: "user_name"}, {title: "Рейтинг", dataIndex: "rating", key: "rating"}];
    const rating_users = [{number: 1, user_name: <><Avatar src={`${STORAGE}/avatars/${"1_avatar.png"}`} style={{ verticalAlign: 'middle', marginRight: 10 }} size="large"></Avatar><Text strong>Zhdanov Stephan</Text></>, rating: 100}];
    return (
        <Card title="ТОП по рейтингу" bordered={false}>
            <Table columns={columns} dataSource={rating_users} />
        </Card>
    );
}

export default LeaderBoard; 