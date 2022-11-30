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
  CalendarOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


function getItem(
  label,
  key,
  icon,
  href,
  children,
) {
    console.log();
  return {
   label: ((children === undefined) ? <Link to={href}>{label}</Link>: label),
   key: key,
   icon: icon,
   children: children
  };
}

const items = [
  getItem('Аккаунт', '1', <UserOutlined />, "/"),
  getItem('Достижения', '2', <CrownOutlined />, "/achivments"),
  getItem('Задачи', 'sub1', <CodeOutlined />, "", [
    getItem('Задача дня', '3', <FieldTimeOutlined />, "/"),
    getItem('ДЗ', '4', <HomeOutlined />, "/"),
    getItem('СР', '5', <CheckSquareOutlined/>, "/"),
  ]),
  getItem('Мероприятия', '6', <CalendarOutlined />, "/events"),
  getItem('Уведомления', '7', <NotificationOutlined />, "/notifications"),
  getItem('Статистика', '8', <PieChartOutlined/>, "/stats"),
];

const BaseLayout = () => { 
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{marginTop: "60px"}}/>
      </Sider>
      
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SHTP 2022</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;