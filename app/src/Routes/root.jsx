import React, { useContext, useEffect, useState } from 'react';
import { config } from "../config";
import {
    Layout,
    Menu,
    Badge,
    Modal,
    Typography,
    Space,
    ConfigProvider,
    theme,
    FloatButton,
    Alert,
} from "antd";

import userContext from '../Contexts/user';

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from './routes';
import { PageLoading } from '../Components/PageLoading';
const { Content, Sider, Footer } = Layout;
const { Text } = Typography;
const CLIENT_VER = config.CLIENT_VER;


export const Root = () => {
    const location = useLocation();
    const [backendStatus, setBackendStatus] = useState("Online");
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { userInfo, loading, loggedIn } = useContext(userContext);
    useEffect(() => {
        if (!loading) {
            console.log("Logged: ", loggedIn);
        }
    }, [loading, userInfo])

    if (loading) return (<PageLoading />);
    else if (!loggedIn) return <Navigate to="/login" />;
    else if (loggedIn) return <Layout hasSider>
        <Sider
            breakpoint="lg"
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 2,
            }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname.slice(1)]} items={routes.map(route => {
                if (!route.private || userInfo.userRole > 0) {
                    return {
                        key: route.path,
                        icon: route.icon,
                        label: <Link to={route.path}>{route.label}</Link>,
                    }
                }
            })} />
        </Sider>
        <Layout className="site-layout">
            <Content
                style={{ marginLeft: "25%", overflow: "auto", marginRight: "5%" }}
                width="70%">
                <ConfigProvider
                    theme={theme.darkAlgorithm}
                >
                    <Alert message="Уведомление ShTP" description="На данный момент ShTP работает в бета режиме. Обновление компонентов верхнего уровня: Backend, Frontend и Checker производятся через предварительную пересборку контейнера, а затем перезапуск. Максимальный downtime - 5 секунд." type="warning" showIcon className="topLevelMessage" />
                    <Outlet />
                    <Footer
                        style={{
                            textAlign: "center",
                            backgroundColor: "#f5f5f5"
                        }}
                        className="shtp_debug_info"
                    >
                        <Space direction="vertical">
                            <Text strong>ShTP project</Text>
                            <Text>
                                Client version: <Text code>{CLIENT_VER}</Text>
                            </Text>
                            <Text>
                                FrontEnd:{" "}
                                <Text code type="success">
                                    Online
                                </Text>
                            </Text>
                            <Text>
                                BackEnd (API):{" "}
                                <Text
                                    code
                                    type={backendStatus === "Online" ? "success" : "danger"}
                                >
                                    {backendStatus}
                                </Text>
                            </Text>
                            <Text code onClick={() => { window.open("https://stats.uptimerobot.com/DVn8xCo4W7") }} style={{ cursor: "pointer" }} type="success">
                                UpTime status
                            </Text>
                        </Space>
                    </Footer>
                </ConfigProvider>
            </Content>
        </Layout>
    </Layout>

};

