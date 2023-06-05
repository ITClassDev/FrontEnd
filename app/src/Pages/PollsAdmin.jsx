import React, { useState, useEffect, useContext } from "react";
import { Tabs, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LoadingBar } from "../Components/Loading";
import PollsTable from "../Components/PollsTable";
import { NotFound } from "./NotFound";
import CreatePoll from "../Components/CreatePoll";
import { API } from "../api";
import useDocumentTitle from "../useDocumentTitle";
import userContext from "../Contexts/user";


const { Title } = Typography;

export const PollsAdmin = () => {
    const { userInfo, loading, loggedIn } = useContext(userContext);
    useDocumentTitle("ШТП | Опросы");
    const [pollsData, setPollsData] = useState([]);
    const loadPollsTable = () => {
        API({ endpoint: "/polls", ok: (resp) => { setPollsData(resp.data.map(poll => ({ key: poll.id, id: poll.id, title: poll.title, description: poll.description }))) } });
    }
    useEffect(() => {
        loadPollsTable();
    }, []);
    if (userInfo.role === "admin") {
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

