import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PieChartOutlined,
  UserOutlined,
  NotificationOutlined,
  CrownOutlined,
  CodeOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  ControlOutlined,
  ProfileOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Layout, Menu, Badge, Modal } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import "../index.css";
import LoginForm from './LoginForm';
const { Content, Sider } = Layout;

function getItem(
  label,
  key,
  icon,
  href,
  children,
) {
  return {
    label: ((children === undefined) ? <Link to={href}>{label}</Link> : label),
    key: key,
    icon: icon,
    children: children
  };
}

function logOut(nav){
  localStorage.clear();
  nav(0);
}


const BaseLayout = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loginModelOpened, openLoginModal] = useState(false);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      if (user.status != 0){
        if (user.status == 1)
          setMenu(logined_menu);
        else
          setMenu(non_logined_menu)
      }
  }, [user]);

  const openLogin = () => {
    openLoginModal(true);
  };
  const hideLogin = () => {
    openLoginModal(false);
  };

  const non_logined_menu = [
    { label: "Login", key: '2', icon: <LogoutOutlined />, onClick: () => { openLogin() } }
  ];

  const logined_menu = [
    getItem('Аккаунт', '1', <UserOutlined />, "/"),
    getItem('Достижения', '2', <CrownOutlined />, "/achivments"),
    getItem('Задачи', 'sub1', <CodeOutlined />, "", [
      getItem('Задача дня', '3', <FieldTimeOutlined />, "/challenge"),
      getItem('ДЗ', '4', <HomeOutlined />, "/homework"),
      getItem('СР', '5', <CheckSquareOutlined />, "/"),
    ]),
    getItem('Мероприятия', '6', <CalendarOutlined />, "/events"),
    getItem('Уведомления', '7', <Badge dot={1}><NotificationOutlined /></Badge>, "/notifications"),
    getItem('Статистика', '8', <PieChartOutlined />, "/stats"),
    getItem('API доки', '9', <ProfileOutlined />, "/docs"),
    getItem('Админка', '10', <ControlOutlined />, "/admin"),
    { label: "Logout", key: '11', icon: <LoginOutlined />, onClick: () => { logOut(navigate) } }
  ];

  return (

    <Layout hasSider>
      <Modal title="Войти в аккаунт" open={loginModelOpened} onCancel={hideLogin} footer={[]}>
          <LoginForm/>
      </Modal>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg" style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 2000
      }}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menu} />
      </Sider>

      <Layout className="site-layout" style={{ backgroundColor: '' }}>
        <Content style={{ marginLeft: '25%', overflow: 'auto', marginRight: '5%' }} width="70%">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;