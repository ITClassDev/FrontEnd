import React, { useState } from 'react';
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
  ProfileOutlined
} from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import "../index.css";
const {  Content, Sider } = Layout;


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

const items = [
  getItem('Аккаунт', '1', <UserOutlined />, "/"),
  getItem('Достижения', '2', <CrownOutlined />, "/achivments"),
  getItem('Задачи', 'sub1', <CodeOutlined />, "", [
    getItem('Задача дня', '3', <FieldTimeOutlined />, "/challenge"),
    getItem('ДЗ', '4', <HomeOutlined />, "/"),
    getItem('СР', '5', <CheckSquareOutlined />, "/"),
  ]),
  getItem('Мероприятия', '6', <CalendarOutlined />, "/events"),
  getItem('Уведомления', '7', <Badge dot={1}><NotificationOutlined /></Badge>, "/notifications"),
  getItem('Статистика', '8', <PieChartOutlined />, "/stats"),
  getItem('API доки', '9', <ProfileOutlined />, "/docs"),
  getItem('Админка', '10', <ControlOutlined />, "/admin"),
];

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg" style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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