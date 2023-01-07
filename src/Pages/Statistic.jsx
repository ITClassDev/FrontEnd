import React from "react";
import { Typography } from "antd";


const { Title, Text } = Typography;
const StatisticPage = () => {
    return (
        <>
            <Title level={3}>Ваша статистика</Title>
            <Text>
                Some notes: rating, tasks solved...
            </Text>
        </>
    );
}

export default StatisticPage;