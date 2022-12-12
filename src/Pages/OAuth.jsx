import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppInfo } from "../api";

const OAuth = () => {
    const { app_id } = useParams();
    const [appTitle, setAppTitle] = useState("Loading...");
    useEffect(() => {
        getAppInfo(app_id, (response) => {
            setAppTitle(response.data.name);
        }, () => {})
    }, []);
    return (
        <>
            <Card bordered={false} title={`Войти в ${appTitle}`}>

            </Card>
        </>
    );
}

export default OAuth;