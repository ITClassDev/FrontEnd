import React from "react";
import { Typography } from "antd";
import { LoadingBar } from "../Components/Loading";


const { Title, Text } = Typography;
const StatisticPage = () => {
    return (
        <>
            <Title level={3}>Ваша статистика</Title>
            <Text>
                Some notes: rating, tasks solved...
            </Text>
            <LoadingBar size={20} align="center"/>
            <LoadingBar size={30} text="Loading"/>
            <LoadingBar size={50}/>
        </>
    );
}

export default StatisticPage;