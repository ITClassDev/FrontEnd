import React, { useEffect, useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { Root } from './Routes/root.jsx';
import { routes } from './Routes/routes.js';
import userContext from './Contexts/user';
import { NotFound } from './Pages/NotFound';
import { PageLoading } from './Components/PageLoading.jsx';
import { API } from './api.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [...routes, {
            path: 'u/:user_id',
            async lazy() {
                let { ViewProfile } = await import("./Pages/ViewProfile.jsx");
                return { Component: ViewProfile };
            }
        }
        ]
    },
    {
        path: 'login',
        async lazy() {
            let { Login } = await import("./Pages/Login.jsx");
            return { Component: Login };
        },
    },
    {
        path: 'poll',
        async lazy() {
            let { Poll } = await import("./Pages/Poll.jsx");
            return { Component: Poll };
        }
    }

]);


const App = () => {
    const [user, setUser] = useState({ userInfo: null, loading: true, loggedIn: false, newNotifications: null});
    useEffect(() => {
        API({
            endpoint: '/auth/me', ok: (response) => {
                setUser({ userInfo: response.data, loading: false, loggedIn: true, newNotifications: response.data.newNotifications });
            }, err: () => {
                setUser({ userInfo: null, loggedIn: false, loading: false, newNotifications: false });
            }
        })

        console.log(String.raw`
      Welcome to, 
       _____ _    _ _______ _____  _ 
      / ____| |  | |__   __|  __ \| |
      | (___| |__| |  | |  | |__) | |
      \___ \|  __  |  | |  |  ___/| |
      ____) | |  | |  | |  | |    |_|
      |____/|_|  |_|  |_|  |_|    (_) 0.0.3
                                    
      `);
    }, []);


    return (
        <userContext.Provider value={{ userInfo: user.userInfo, loading: user.loading, loggedIn: user.loggedIn, newNotifications: user.newNotifications, setUser: setUser }}>
            <RouterProvider router={router} fallbackElement={<PageLoading />} />
        </userContext.Provider>
    )
}

export default App;
