import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import AchivmentsList from "../Components/AchivmentsList";
import { getUserAchievements } from "../api";
import { LoadingHorizCenter } from "../Components/Loading";

const Achivments = () => {
    //const achivments = [{title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}];
    const [achivmentsBlock, setAchivmentsBlock] = useState(<LoadingHorizCenter/>);
    useEffect(() => {
        getUserAchievements((resp) => {setAchivmentsBlock(<AchivmentsList achivments={resp.data.achievements}/>)}, () => {})
    }, []);
    const tabs = [
        { label: 'Олимпиады & Конкурсы', key: 'item-1', children: achivmentsBlock },
        { label: 'Мероприятия', key: 'item-2', children: 'Content 2' },
        { label: 'Системные', key: 'item-3', children: 'Content 3' },
    ];
    
    return (
        <>
            <h1>Ваши достижения</h1>
            <Tabs items={tabs} />

        </>
    );
}

export default Achivments;