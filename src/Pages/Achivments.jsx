import React from "react";
import { Tabs } from "antd";
import AchivmentsList from "../Components/AchivmentsList";
const Achivments = () => {
    const achivments = [{title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}, {title: "Победитель", desc: "Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum", points: 50}];
    const tabs = [
        { label: 'Олимпиады', key: 'item-1', children: (<AchivmentsList achivments={achivments}/>) },
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