import React from "react";
import HomeTaskCard from "../Components/HomeTaskCard";

const HomeWork = () => {
    const homeworks = [{title: "STR EASY", tag: "easy", complited_percent: 65, description: "Самые простые задачи на строки в C++.", contest_id: 1234}, {title: "STR HARD", tag: "impossible", complited_percent: 5, description: "Сложные задачи на строки", contest_id: 102}]
    return (
        <>
            <h1>Домашние работы</h1>
            {homeworks.map((homework, ind) => (
                <HomeTaskCard {...homework} key={ind}/>
            ))}
        </>
    );
}

export default HomeWork;