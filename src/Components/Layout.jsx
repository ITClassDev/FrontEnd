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
  BulbOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Badge,
  Modal,
  Typography,
  Space,
  ConfigProvider,
  theme,
  FloatButton
} from "antd";
import { Outlet, Link } from "react-router-dom";
import "../index.css";
import LoginForm from "./LoginForm";
import { CLIENT_VER } from "../config";
import { router_mapping } from "../router_mapping";
import IntroPage from "./IntroPage";
import { getUser } from "../api";

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
const BaseLayout = ({ user, setUserData, backendStatus }) => {
  const onClickMenu = (item) => {
    setSelectedKey(item.key);
  };


  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [loginModelOpened, openLoginModal] = useState(false);
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState(<>Loading...</>);
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
  ];
  const adminMenuItem = getItem("Админка", "11", <ControlOutlined />, "/admin");
  const logoutBtn = {
    label: "Выйти",
    key: "12",
    icon: <LogoutOutlined />,
    onClick: () => {
      logOut(navigate);
    },
  };

  const [selectedKey, setSelectedKey] = useState(
    router_mapping[location.pathname][0]
  );

  useEffect(() => {
    if (user.status !== 0) {
      if (user.status === 1) {
        setMenu(logined_menu);
        if (user.user.userRole === 2)
          setMenu([...logined_menu, adminMenuItem, logoutBtn]);
        else setMenu([...logined_menu, logoutBtn]);
        setPage(<Outlet />);
      } else {
        if (router_mapping[location.pathname][1])
          // if page can be accessed by anon users
          setPage(<Outlet />);
        else setPage(<IntroPage />);

        setMenu(non_logined_menu);
      }
    }
  }, [user]);
  useEffect(() => {
    getUser(
      (resp) => {
        setUserData({ status: 1, user: resp.data.user });
      },
      (resp) => {
        openLoginModal(true);
      } // on token expired
    );
  }, [location]);

  const openLogin = () => {
    openLoginModal(true);
  };
  const hideLogin = () => {
    openLoginModal(false);
  };

  const non_logined_menu = [
    {
      label: "Войти",
      key: "2",
      icon: <LoginOutlined />,
      onClick: () => {
        openLogin();
      },
    },
  ];

  return (
    <Layout hasSider>
      <FloatButton type={isDarkMode ? "primary" : ""} icon={<BulbOutlined/>} onClick={() => setIsDarkMode((previousValue) => !previousValue)} />
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

      <Layout className="site-layout" style={{ backgroundColor: "#181818" }}>
        <Content
          style={{ marginLeft: "25%", overflow: "auto", marginRight: "5%" }}
          width="70%"
        >
          <ConfigProvider
            theme={{
              algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
          >
            {page}

            <Footer style={{ textAlign: "center", backgroundColor: "#181818" }}>
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
          </ConfigProvider>
        </Content>
      </Layout>

    </Layout>
  );
};

export default BaseLayout;
