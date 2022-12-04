import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Events from './Pages/Events';
import Achivments from './Pages/Achivments';
import Notifications from './Pages/Notifications';
import ApiDocs from './Pages/ApiDocs';
import NotFound from './Pages/NotFound';
import BaseLayout from './Components/Layout';
import Challenge from './Pages/Challenge';
import LoginPage from './Pages/Login';
import Admin from './Pages/Admin';
import { getUser } from './api';

export default function App() {
  const [userData, setUserData] = useState({status: 0});
  useEffect(() => {
    getUser((resp) => {setUserData({status: 1, user: resp.data.user})}, () => {setUserData({status: 2})})
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout user={userData}/>}>
          <Route index element={<Home />}/>
          <Route path="events" element={<Events />} />
          <Route path="achivments" element={<Achivments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="docs" element={<ApiDocs />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="login" element={<LoginPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
