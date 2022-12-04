import React, { useEffect, useState } from 'react';
import { getUser } from '../api';

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
  LockOutlined
} from '@ant-design/icons';
import { Layout, Menu, Badge, Modal, Form, Input, Button } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import "../index.css";
import { set } from 'rsuite/esm/utils/dateUtils';
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


const BaseLayout = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loginModelOpened, openLoginModal] = useState(false);
  const [menu, setMenu] = useState([]);
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
    { label: "Login", key: '11', icon: <LogoutOutlined />, onClick: () => { openLogin() } }
  ];

  const logined_menu = [
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

  return (

    <Layout hasSider>
      <Modal title="Войти в аккаунт" open={loginModelOpened} onCancel={hideLogin} footer={[]}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'EMAIL!!!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'PASSWORD!!!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot">
              Забыл пароль
            </a>
          </Form.Item>
        </Form>
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