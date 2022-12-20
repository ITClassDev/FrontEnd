import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  UserOutlined,
  NotificationOutlined,
  StarOutlined,
  CodeOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  ControlOutlined,
  ProfileOutlined,
  LogoutOutlined,
  LoginOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Badge, Modal, Typography, Space } from "antd";
import { Outlet, Link } from "react-router-dom";
import "../index.css";
import LoginForm from "./LoginForm";
import { CLIENT_VER } from "../config";
import { router_mapping } from "../router_mapping";
import IntroPage from "./IntroPage";

const { Content, Sider, Footer } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, href, children) {
  return {
    label: children === undefined ? <Link to={href}>{label}</Link> : label,
    href: href,
    key: key,
    icon: icon,
    children: children,
  };
}

function logOut(nav) {
  localStorage.clear();
  nav(0);
}
const BaseLayout = ({ user, backendStatus }) => {
  const onClickMenu = (item) => {
    setSelectedKey(item.key);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [loginModelOpened, openLoginModal] = useState(false);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const logined_menu = [
    getItem("Аккаунт", "1", <UserOutlined />, "/"),
    getItem("Достижения", "2", <StarOutlined />, "/achivments"),
    getItem("Задачи", "sub1", <CodeOutlined />, "", [
      getItem("Задача дня", "3", <FieldTimeOutlined />, "/challenge"),
      getItem("ДЗ", "4", <HomeOutlined />, "/homework"),
      getItem("СР", "5", <CheckSquareOutlined />, "/tests"),
    ]),
    getItem("Мероприятия", "6", <CalendarOutlined />, "/events"),
    getItem(
      "Уведомления",
      "7",
      <Badge dot={1}>
        <NotificationOutlined />
      </Badge>,
      "/notifications"
    ),
    getItem("Статистика", "8", <PieChartOutlined />, "/stats"),
    getItem("Доки по API", "9", <ProfileOutlined />, "/docs"),
    getItem("Приложения", "10", <CodeSandboxOutlined />, "/apps"),
    getItem("Админка", "11", <ControlOutlined />, "/admin"),
    {
      label: "Выйти",
      key: "12",
      icon: <LoginOutlined />,
      onClick: () => {
        logOut(navigate);
      },
    },
  ];
  const [selectedKey, setSelectedKey] = useState(
    router_mapping[location.pathname][0]
  );
  const [page, setPage] = useState(<>Loading...</>);

  useEffect(() => {
    if (user.status !== 0) {
      if (user.status === 1) {
        setMenu(logined_menu);
        setPage(<Outlet />);
      } else {
        if (router_mapping[location.pathname][1]) // if page can be accessed by anon users
          setPage(<Outlet />);
        else
          setPage(<IntroPage />);

        setMenu(non_logined_menu);
      }
    }
  }, [user]);

  const openLogin = () => {
    openLoginModal(true);
  };
  const hideLogin = () => {
    openLoginModal(false);
  };

  const non_logined_menu = [
    {
      label: "Login",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: () => {
        openLogin();
      },
    },
  ];

  return (
    <Layout hasSider>
      <Modal
        title="Войти в аккаунт"
        open={loginModelOpened}
        onCancel={hideLogin}
        footer={[]}
      >
        <LoginForm />
      </Modal>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={menu}
          onClick={onClickMenu}
        />
      </Sider>

      <Layout className="site-layout" style={{ backgroundColor: "" }}>
        <Content
          style={{ marginLeft: "25%", overflow: "auto", marginRight: "5%" }}
          width="70%"
        >
          {page}
          <Footer style={{ textAlign: "center" }}>
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
            </Space>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
