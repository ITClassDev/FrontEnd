import React, { useEffect, useState } from "react";
import HomeTaskCard from "../Components/HomeTaskCard";
import { Typography } from "antd";
import useDocumentTitle from "../useDocumentTitle";
import { API } from "../api";

const { Title, Text } = Typography;

export const HomeWork = () => {
    useDocumentTitle("ШТП | Домашние работа");
    // const homeworks = [{title: "STR EASY", tag: "easy", complited_percent: 65, description: "Самые простые задачи на строки в C++.", contest_id: 1234}, {title: "STR HARD", tag: "impossible", complited_percent: 5, description: "Сложные задачи на строки", contest_id: 102}]
    const [activeHomeworks, setActiveHomeworks] = useState([]);
    useEffect(() => {
        API({
            endpoint: "/assigments/contests/available", ok: (resp) => {
                setActiveHomeworks(resp.data);
            }
        })
    }, [])
    return (
        <>
            <Title level={3}>Домашние работы</Title>
            <Title level={4}>Активные</Title>
            {activeHomeworks.length ? (
                activeHomeworks.map((homework, ind) => (
                    <HomeTaskCard {...homework} key={ind} />
                ))
            ) : <Text>У вас пока нет активных домашних заданий</Text>}
            <Title level={4}>Завершённые</Title>
            <Text>У вас пока нет сданных домашних заданий</Text>
        </>
    );
}
