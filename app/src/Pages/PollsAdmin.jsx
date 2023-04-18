import React, { useState, useEffect } from "react";
import { Tabs, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LoadingBar } from "../Components/Loading";
import PollsTable from "../Components/PollsTable";
import NotFound from "./NotFound";
import CreatePoll from "../Components/CreatePoll";
import { API } from "../api";


const { Title } = Typography;

const PollsAdmin = ({ user }) => {
    const [pollsData, setPollsData] = useState([]);
    const loadPollsTable = () => {
        API({ endpoint: "/polls/", ok: (resp) => { setPollsData(resp.data.map(poll => ({ key: poll.id, id: poll.id, title: poll.title, description: poll.description }))) } });
    }
    useEffect(() => {
        loadPollsTable();
    }, []);
    if (user.user.userRole === 2) {
        return (
            <>
                <Title level={3}>Опросы</Title>
                <Tabs
                    defaultActiveKey="1"
                    onChange={(tab) => { if (tab === "1")  loadPollsTable(); }
                    }
                    items={[
                        {
                            label: "Обзор",
                            key: "1",
                            children: <PollsTable polls={pollsData} />,
                        }, {
                            label: <><PlusOutlined />Создать</>,
                            key: "2",
                            children: <CreatePoll />
                        }]}
                />
            </>
        );
    } else {
        return <NotFound />
    }
};


export default PollsAdmin;
