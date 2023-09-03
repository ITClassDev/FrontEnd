import React, { useEffect, useState } from "react";
import { Modal, Table, Typography, Tag } from "antd";
import { API } from "../api";
import ProfileLink from "./ProfileLink";
import { config } from "../config";


const STORAGE = config.STORAGE;
const { Title, Text } = Typography;

export const ContestStatistic = ({ contestId, show, onClose }) => {
    const [data, setData] = useState([]);
    const [allTasksCount, setAllTasksCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const MARKS_COLORS_MAP = { 5: "success", 4: "blue", 3: "yellow", 2: "red" };
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
            key: "mark",
            filters: [{ value: 2, text: 2 }, { value: 3, text: 3 }, { value: 4, text: 4 }, { value: 5, text: 5 }],
            onFilter: (value, record) => record.mark === value,
            render: (_, record) => <Tag color={MARKS_COLORS_MAP[record.mark]}>{record.mark}</Tag>
        }
    ];
    useEffect(() => {
        setLoading(true);
        API({
            endpoint: `/assigments/contest/${contestId}/statistics`, ok: (resp) => {
                setAllTasksCount(resp.data.tasksCount);
                setData(resp.data.students);
                setLoading(false);
            }
        });
    }, [contestId])
    return (
        <Modal
            title={<Title level={4}>Статистика по контесту</Title>}
            transitionName=""
            open={show}
            width={"90%"}
            footer={<></>}
            onCancel={() => {
                onClose();
            }}
        >
            <Title level={5}>Оценки</Title>
            <Table columns={columns_statistics_table} dataSource={data} loading={loading} />
            <Title level={5}>Визуализация</Title>
            <Text>Планируется в релизе ShTP 2.0.1</Text>
        </Modal>
    )
}