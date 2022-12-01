import React from "react";
import { Card } from 'antd';
import { Rate, Descriptions, Table } from 'antd';
import SendTask from "./SendTask";
import MyAttempts from "./MyAttempts";

const ProgTask = ({title, desc, time_limit, memory_limit}) => {
    const tests = [{key: 1, input: "6\n4 5 3 4 2 3", output: "5 4 4 3 3 2"}, {key: 2, input: "3\n1 2 3", output: "2 1 3"}];
    const columns = [{title: "Вход", "dataIndex": "input", "key": "input"}, {title: "Выход", "dataIndex": "output", "key": "output"}]
    return (
        <>
            <Card title={title} style={{marginBottom: 20}}>
                <Descriptions title="Лимиты" bordered style={{marginBottom: "20px"}}>
                    <Descriptions.Item label="Время"><b>{time_limit} секунд</b></Descriptions.Item>
                    <Descriptions.Item label="Память"><b>{memory_limit} МБ</b></Descriptions.Item>
                </Descriptions>
                <h3>Текст задачи</h3>
                {desc}
                <h3>Примеры</h3>
                <Table dataSource={tests} columns={columns} style={{ whiteSpace: 'pre'}}/>
            </Card>
            <SendTask/>
            <MyAttempts/>
            
        </>
    );
    /* Reactions
                <h3>Оцените задачу</h3>
                <Rate/>

    */
    
}

export default ProgTask;