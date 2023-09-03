import React, { useEffect, useState } from "react";
import { Modal, Table, Typography, Tag } from "antd";
import { API } from "../api";
import ProfileLink from "./ProfileLink";
import { config } from "../config";


const STORAGE = config.STORAGE;
const { Title } = Typography;

export const ContestStatistic = ({ contestId, show, onClose }) => {
    const [data, setData] = useState([]);
    const [allTasksCount, setAllTasksCount] = useState(null);
    const columns_statistics_table = [
        {
            title: "ФИО",
            dataIndex: "user",
            key: "user",
            render: (_, record) => <ProfileLink user={record} storage={STORAGE} />,
            sorter: (a, b) => a.firstName.localeCompare(b.lastName)
        },
        {
            title: "Решено задач",
            dataIndex: "solvedCount",
            key: "solvedCount",
            render: (_, record) => <Tag color={!record.solvedCount ? "red" : "blue"}>{record.solvedCount}/{allTasksCount}</Tag>,
            sorter: (a, b) => a.solvedCount - b.solvedCount,
        },
        {
            title: "Оценка",
            dataIndex: "mark",
            key: "mark"
        }
    ];
    useEffect(() => {
        API({
            endpoint: `/assigments/contest/${contestId}/statistics`, ok: (resp) => {
                setAllTasksCount(resp.data.tasksCount);
                setData(resp.data.students);
            }
        });
    }, [contestId])
    return (
        <Modal
            title={<Title level={4}>Статистика по контесту {contestId}</Title>}
            transitionName=""
            open={show}
            width={"90%"}
            footer={<></>}
            onCancel={() => {
                onClose();
            }}
        >
            <Table columns={columns_statistics_table} dataSource={data} />
            <Title level={5}>Оценки</Title>
        </Modal>
    )
}