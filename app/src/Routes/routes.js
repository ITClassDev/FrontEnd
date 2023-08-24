import React from 'react';

import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  ProfileOutlined,
  ControlOutlined,
  StarOutlined,
  CodeOutlined,
  HomeOutlined,
  CalendarOutlined,
  CodeSandboxOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  BranchesOutlined,
  AndroidOutlined
} from '@ant-design/icons';


// Pages
export const routes = [
  {
    index: true,
    path: '', // Trick (react router can't get not empty path and index), but we need this path for ant design menu component
    async lazy() {
      let { Home } = await import("../Pages/Home.jsx");
      return { Component: Home };
    },
    icon: <UserOutlined />,
    label: 'Аккаунт',
    access: 'all'
  },
  {
    path: 'achievements',
    async lazy() {
      let { Achivments } = await import("../Pages/Achivments.jsx");
      return { Component: Achivments };
    },
    icon: <StarOutlined />,
    label: 'Достижения',
    access: 'student'
  },
  {
    path: 'settings',
    async lazy() {
      let { Settings } = await import("../Pages/Settings.jsx");
      return { Component: Settings };
    },
    icon: <SettingOutlined />,
    label: 'Настройки',
    access: 'all'
  },
  {
    path: 'tasks',
    icon: <CodeOutlined />,
    label: 'Задачи',
    access: 'student',
    children: [{
      path: 'challenge',
      async lazy() {
        let { Challenge } = await import("../Pages/Challenge.jsx");
        return { Component: Challenge };
      },
      icon: <FieldTimeOutlined />,
      label: 'Задача дня'

    },
    {
      path: 'homework',
      async lazy() {
        let { HomeWork } = await import("../Pages/HomeWork.jsx");
        return { Component: HomeWork };
      },
      icon: <HomeOutlined />,
      label: 'ДЗ'
    }
    ]
  },
  {
    path: 'notifications',
    async lazy() {
      let { Notifications } = await import("../Pages/Notifications.jsx");
      return { Component: Notifications };
    },
    icon: <BellOutlined />,
    label: 'Уведомления',
    badge: true,
    access: 'all'
  },
  {
    path: 'events',
    async lazy() {
      let { Events } = await import("../Pages/Events.jsx");
      return { Component: Events };
    },
    icon: <CalendarOutlined />,
    label: 'Мероприятия',
    access: 'all'
  },
  {
    path: 'leaderboard',
    async lazy() {
      let { LeaderBoard } = await import("../Pages/LeaderBoard.jsx");
      return { Component: LeaderBoard };
    },
    icon: <LineChartOutlined/>,
    label: 'ТОП',
    access: 'all'
  },
  {
    path: 'apps',
    async lazy() {
      let { Apps } = await import ("../Pages/Apps.jsx");
      return { Component: Apps };
    },
    icon: <CodeSandboxOutlined/>,
    label: 'Приложения',
    access: 'all'
  },
  {
    path: 'docs',
    async lazy() {
      let { ApiDocs } = await import("../Pages/ApiDocs.jsx");
      return { Component: ApiDocs };
    },
    icon: <ProfileOutlined />,
    label: 'Документация',
    access: 'all'
  },
  {
    path: 'projects',
    async lazy() {
      let { Projects } = await import("../Pages/Projects.jsx");
      return { Component: Projects };
    },
    icon: <BranchesOutlined />,
    label: '* Мои проекты',
    access: 'all'
  },
  {
    path: 'courses',
    async lazy() {
      let { Projects } = await import("../Pages/Projects.jsx");
      return { Component: Projects };
    },
    icon: <BranchesOutlined />,
    label: '* Курсы',
    access: 'all'
  },
  {
    path: 'admin',
    async lazy() {
      let { Admin } = await import("../Pages/Admin.jsx");
      return { Component: Admin };
    },
    icon: <ControlOutlined />,
    label: 'Админ-панель',
    access: 'admin'
  },
  {
    path: 'polls',
    async lazy() {
      let { PollsAdmin } = await import("../Pages/PollsAdmin.jsx");
      return { Component: PollsAdmin };
    },
    icon: <QuestionCircleOutlined />,
    label: 'Опросы',
    access: 'admin'
  },
  {
    path: 'http://shtp.1561.ru',
    icon: <AndroidOutlined />,
    label: 'Мобильное приложение',
    access: 'all'
  },
  // {
  //   path: 'services',
  //   icon: <CodeOutlined />,
  //   label: 'Сервисы',
  //   access: 'student',
  //   children: [{
  //     path: 'challenge',
  //     async lazy() {
  //       let { Challenge } = await import("../Pages/Challenge.jsx");
  //       return { Component: Challenge };
  //     },
  //     icon: <FieldTimeOutlined />,
  //     label: 'Задача дня'

  //   },
  //   {
  //     path: 'services',
  //     async lazy() {
  //       let { HomeWork } = await import("../Pages/HomeWork.jsx");
  //       return { Component: HomeWork };
  //     },
  //     icon: <HomeOutlined />,
  //     label: 'ДЗ'
  //   }
  //   ]
  // },
]
