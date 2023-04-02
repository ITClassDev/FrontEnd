import React from "react";
import { Tabs, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LoadingBar } from "../Components/Loading";
import PollsTable from "../Components/PollsTable";
import NotFound from "./NotFound";
import CreatePoll from "../Components/CreatePoll";

const { Title } = Typography;

const PollsAdmin = ({ user }) => {
    if (user.user.userRole === 2) {
        return (
            <>
                <Title level={3}>Опросы</Title>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: "Обзор",
                            key: "1",
                            children: <PollsTable />,
                        }, {
                            label: <><PlusOutlined />Создать</>,
                            key: "2",
                            children: <CreatePoll/>
                        }]}
                />
            </>
        );
    } else {
        return <NotFound />
    }
};


export default PollsAdmin;
