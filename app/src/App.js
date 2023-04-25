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
        children: routes
    },
    {
        path: 'login',
        async lazy() {
            let { Login } = await import("./Pages/Login.jsx");
            return { Component: Login };
        },
    }
]);


const App = () => {
    const [user, setUser] = useState({ userInfo: null, loading: true, loggedIn: false });
    
    useEffect(() => {
        API({endpoint: '/auth/me', ok: (response) => {
            setUser({ userInfo: response.data.user, loggedIn: true, loading: false });
        }, err: () => {
            setUser({ userInfo: null, loggedIn: false, loading: false });
        }})
        
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
        <userContext.Provider value={{ userInfo: user.userInfo, loading: user.loading, loggedIn: user.loggedIn }}>
            <RouterProvider router={router} fallbackElement={<PageLoading />} />
        </userContext.Provider>
    )
}

export default App;
