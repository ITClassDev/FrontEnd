import React, { useState } from 'react';
import {
  PieChartOutlined,
  UserOutlined,
  NotificationOutlined,
  CrownOutlined,
  CodeOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  CheckSquareOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


function getItem(
  label,
  key,
  icon,
  children,
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Аккаунт', '1', <UserOutlined />),
  getItem('Достижения', '2', <CrownOutlined />),
  getItem('Задачи', 'sub1', <CodeOutlined />, [
    getItem('Задача дня', '3', <FieldTimeOutlined />),
    getItem('ДЗ', '4', <HomeOutlined />),
    getItem('СР', '5', <CheckSquareOutlined/>),
  ]),
  getItem('Уведомления', '6', <NotificationOutlined />),
  getItem('Статистика', '7', <PieChartOutlined/>),
];

const Home = () => {
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
            <div>Block content here</div>
            <div>For ex. API</div>
            <div>But, yeah AXIOS async loading</div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SHTP 2022</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;