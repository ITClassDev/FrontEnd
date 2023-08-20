import React, { useEffect, useState } from "react";
import HomeTaskCard from "../Components/HomeTaskCard";
import { Typography } from "antd";
import useDocumentTitle from "../useDocumentTitle";
import { API } from "../api";

const { Title } = Typography;

export const HomeWork = () => {
    useDocumentTitle("ШТП | Домашние работа");
    // const homeworks = [{title: "STR EASY", tag: "easy", complited_percent: 65, description: "Самые простые задачи на строки в C++.", contest_id: 1234}, {title: "STR HARD", tag: "impossible", complited_percent: 5, description: "Сложные задачи на строки", contest_id: 102}]
    const [activeHomeworks, setActiveHomeworks] = useState([]);
    useEffect(() => {
        API({endpoint: "/assigments/contests/available", ok: (resp) => {
            setActiveHomeworks(resp.data);
        }})
    }, [])
    return (
        <>
            <Title level={3}>Домашние работы</Title>
            <Title level={4}>Активные</Title>
            {activeHomeworks.map((homework, ind) => (
                <HomeTaskCard {...homework} key={ind}/>
            ))}
            <Title level={4}>Завершённые</Title>
        </>
    );
}
