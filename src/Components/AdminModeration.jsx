import React from "react";
import { Typography, Table } from "antd";

const { Title } = Typography;

const AchivmentsModeration = () => {
    const moderationColumns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Заголовок",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "На модерации с",
            dataIndex: "moderation_date",
            key: "moderation_date"
        }
        
    ]
    return (
        <>
            <Title level={4} style={{marginTop: 0}}>Очередь модерации</Title>
            <Table columns={moderationColumns} />
        </>
    )
}

export default AchivmentsModeration;