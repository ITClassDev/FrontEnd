import React, { useContext, useEffect, useState } from 'react';
import { config } from "../config";
import {
    Layout,
    Menu,
    Badge,
    Typography,
    Space,
    ConfigProvider,
    theme,
    FloatButton,
    notification,
    Alert
} from "antd";

import { BulbOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import userContext from '../Contexts/user';
import { routes } from './routes';
import { PageLoading } from '../Components/PageLoading';
import { usePollingEffect } from '../Hooks/usePollingEffect';
import { API } from '../api';
import { parseNotification } from '../notifications';


const { Content, Sider, Footer } = Layout;
const { Text } = Typography;
const CLIENT_VER = config.CLIENT_VER;


export const Root = () => {
    const location = useLocation();
    const [backendStatus, setBackendStatus] = useState("Online");
    const [notificationApi, contextHolder] = notification.useNotification();

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("isDarkMode") === "true"
    );
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');

    }

    const { userInfo, loading, setUser, loggedIn } = useContext(userContext);
    useEffect(() => {
        document.body.style = `background: ${localStorage.getItem("isDarkMode") === "true" ? "#181818" : "#f5f5f5"};`; // apply theme background
    }, []);

    usePollingEffect(
        async () => {
            API({
                endpoint: '/notifications/polling', ok: (response) => {
                    if (response.data.length) { // New notifications
                        response.data.forEach(notification => {
                            let parsed = parseNotification(notification);
                            const audio = new Audio('notification.wav');
                            audio.play();
                            notificationApi[parsed.color]({
                                message: parsed.title,
                                description: parsed.description,
                            });
                            setUser(({ userInfo: Object.assign({}, userInfo, { new_notifications: true }), loggedIn: true, loading: false }));
                        });
                    }
                }
            })
        },
        [],
        { interval: 5000 }
    );


    // useEffect(() => {

    //     if (!loading) {
    //         console.log("Logged: ", loggedIn);
    //     }
    // }, [loading, userInfo])

    if (loading) return (<PageLoading />);
    else if (!loggedIn) return <Navigate to="/login" />;
    else if (loggedIn) return <Layout hasSider>{contextHolder}
        <FloatButton
            type={isDarkMode ? "primary" : ""}
            icon={<BulbOutlined />}
            onClick={() => {
                setIsDarkMode((previousValue) => !previousValue);
                document.body.style = `background: ${isDarkMode ? "#f5f5f5" : "#181818"
                    };`;
                localStorage.setItem("isDarkMode", !isDarkMode);
            }}
        />
        <Sider
            collapsible
            breakpoint="lg"
            theme={isDarkMode ? "dark" : "light"}
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
            <Menu theme={isDarkMode ? "dark" : "light"} mode="inline" defaultSelectedKeys={[location.pathname.slice(1)]} items={[...routes, {
                label: "Выйти",
                key: "logout_btn",
                access: 'all',
                onClick: () => { logOut() },
                icon: <LogoutOutlined />
            }].map(route => {
                if (route.access === 'all' || (route.access === 'student' && userInfo.userRole === 0) || (route.access === 'admin' && userInfo.userRole >= 1)) { // Access managment
                    let icon = route.icon;
                    if (route.badge) {
                        icon = <Badge dot={userInfo.new_notifications} showZero={false}>
                            {route.icon}
                        </Badge>
                    }
                    let children = null;
                    let key = route.path;
                    let label = <Link to={route.path}>{route.label}</Link>;
                    if (route.children) {
                        children = route.children.map(sub_route => ({ key: `${route.path}/${sub_route.path}`, icon: sub_route.icon, label: <Link to={`${route.path}/${sub_route.path}`}>{sub_route.label}</Link> }));
                        key = "sub_holder";
                        label = route.label;
                    }
                    return {
                        key: key,
                        icon: icon,
                        label: label,
                        children: children,
                        onClick: route.onClick
                    }
                }
            })} />
        </Sider>
        <Layout className="site-layout" style={{ backgroundColor: isDarkMode ? "#181818" : "#f5f5f5" }}>
            <Content
                style={{ marginLeft: "25%", overflow: "auto", marginRight: "5%" }}
                width="70%">
                <ConfigProvider
                    theme={{
                        algorithm: isDarkMode
                            ? theme.darkAlgorithm
                            : theme.defaultAlgorithm,
                    }}
                >
                    <Alert message="Уведомление ShTP" description={<>На данный момент ShTP работает в бета режиме. Свои предложения(обнаруженные проблемы) касательно ShTP просьба писать <Typography.Link href='https://shtp.1561.ru/poll?id=648790' target="_blank">сюда</Typography.Link> </>} type="warning" showIcon className="topLevelMessage" />
                    <Outlet />
                    <Footer
                        style={{
                            textAlign: "center",
                            backgroundColor: isDarkMode ? "#181818" : "#f5f5f5",
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

