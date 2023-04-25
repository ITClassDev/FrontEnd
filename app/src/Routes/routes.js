import React from 'react';


import {
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';


// Pages
export const routes = [
  {
    index: true,
    path: '', // Hack
    async lazy() {
      let { Home } = await import("../Pages/Home.jsx");
      return { Component: Home };
    },
    icon: <UserOutlined />,
    label: 'Аккаунт'
  },
  {
    path: 'settings',
    async lazy() {
      let { Settings } = await import("../Pages/Settings.jsx");
      return { Component: Settings };
    },
    icon: <SettingOutlined />,
    label: 'Настройки'
  },
  {
    path: 'notifications',
    async lazy() {
      let { Notifications } = await import("../Pages/Notifications.jsx");
      return { Component: Notifications };
    },
    icon: <UserOutlined />,
    label: 'Уведомления'
  },
  {
    path: 'docs',
    async lazy() {
      let { ApiDocs } = await import("../Pages/ApiDocs.jsx");
      return { Component: ApiDocs };
    },
    icon: <UserOutlined />,
    label: 'Документация'
  },
  {
    path: 'admin',
    async lazy() {
      let { Admin } = await import("../Pages/Admin.jsx");
      return { Component: Admin };
    },
    icon: <UserOutlined />,
    label: 'Админ-панель',
    private: true
  }
]
