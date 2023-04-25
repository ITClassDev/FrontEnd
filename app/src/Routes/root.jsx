import React, { useContext, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import userContext from '../Contexts/user';

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from './routes';
import { PageLoading } from '../Components/PageLoading';
const { Header, Content, Footer, Sider } = Layout;


export const Root = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userInfo, loading, loggedIn } = useContext(userContext);
  useEffect(() => {
    if (!loading) {
      console.log("Logged: ", loggedIn);
    }
  }, [loading, userInfo])

  if (loading) return (<PageLoading/>);
  else if (!loggedIn) return <Navigate to="/login" />;
  else if (loggedIn) return <Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
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
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Outlet/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ShTP dev</Footer>
    </Layout>
  </Layout>

};

