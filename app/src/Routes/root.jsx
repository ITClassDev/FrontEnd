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

import { BulbOutlined, LogoutOutlined, GithubOutlined } from "@ant-design/icons";
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
const SCHOOL_NUMBER = config.SCHOOL_NUMBER;


export const Root = () => {
    const location = useLocation();
    const [backendStatus, setBackendStatus] = useState("Online");
    const [notificationApi, contextHolder] = notification.useNotification();
    const [systemNotification, setSystemNotification] = useState();

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("isDarkMode") === "true"
    );
    const [isCollapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');

    }

    const { userInfo, loading, loggedIn, setUser, newNotifications } = useContext(userContext);

    useEffect(() => {
        document.body.style = `background: ${localStorage.getItem("isDarkMode") === "true" ? "#181818" : "#f5f5f5"};`; // apply theme background
        API({
            endpoint: "/notifications/system", ok: (resp) => {
                setSystemNotification(resp.data);
            }
        })
    }, []);
    usePollingEffect(
        async () => {
            API({
                endpoint: '/notifications', ok: (response) => {
                    if (response.data.length) { // New notifications
                        response.data.forEach(notification => {
                            let parsed = parseNotification(notification);
                            const audio = new Audio('notification.wav');
                            audio.play();
                            notificationApi[parsed.color]({
                                message: parsed.title,
                                description: parsed.description,
                            });
                            setUser((prevState) => ({
                                ...prevState,
                                newNotifications: true,
                            }));
                        });
                    }
                }
            })
        },
        [],
        { interval: 5000 }
    );


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
            collapsed={isCollapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 2,
            }}>
            <div>
                <img
                    src={
                        isDarkMode ?
                            (isCollapsed ? "/logos/dark/small.svg" : "/logos/dark/big.svg") :
                            (isCollapsed ? "/logos/light/small.svg" : "/logos/light/big.svg")
                    }
                    alt={"Логотип ШТП"}
                    className={isDarkMode ? "logo logo-dark" : "logo logo-light"}
                />
            </div>
            <Menu theme={isDarkMode ? "dark" : "light"} mode="inline" defaultSelectedKeys={[location.pathname.slice(1)]} items={[...routes, {
                label: "Выйти",
                key: "logout_btn",
                access: 'all',
                onClick: () => { logOut() },
                icon: <LogoutOutlined />
            }].map(route => {
                if (route.access === 'all' || (route.access === 'student' && userInfo.role === "student") || (route.access === 'admin' && (userInfo.role === "teacher" || userInfo.role === "admin"))) { // Access managment
                    let icon = route.icon;
                    if (route.badge) {
                        icon = <Badge dot={newNotifications} showZero={false}>
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
                    {systemNotification && (systemNotification.map(notification => (
                        <Alert key={notification.uuid} message={notification.title} description={<div dangerouslySetInnerHTML={{ __html: notification.content }} />} type={notification.type} showIcon className="topLevelMessage" />
                    )))}
                    <Outlet />
                    <Footer
                        style={{
                            textAlign: "center",
                            backgroundColor: isDarkMode ? "#181818" : "#f5f5f5",
                        }}
                        className="shtp_debug_info"
                    >
                        <Space direction="vertical">
                            <Text italic>School {SCHOOL_NUMBER} IT class platform</Text>
                            <Text italic>Powered by <Typography.Link href="https://itclassdev.github.io/ShTPLanding">ShTP Project</Typography.Link> {CLIENT_VER}</Text>
                        </Space>
                    </Footer>
                </ConfigProvider>
            </Content>
        </Layout>
    </Layout>

};
