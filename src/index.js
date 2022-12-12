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
import HomeWork from './Pages/HomeWork';
import Contest from './Pages/Contest';
import { getUser } from './api';
import ViewProfile from './Pages/ViewProfile';
import LeaderBoard from './Pages/LeaderBoard';
import OAuth from './Pages/OAuth';

export default function App() {
  const [userData, setUserData] = useState({ status: 0 });
  const [backendStatus, setBackendStatus] = useState("Online");
  useEffect(() => {
    getUser((resp) => { setUserData({ status: 1, user: resp.data.user }) }, (resp) => { setUserData({ status: 2 }); if (resp.code === "ERR_NETWORK") { setBackendStatus("Offline"); } })
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout user={userData} backendStatus={backendStatus} />}>
          <Route index element={<Home user={userData} />} />
          <Route path="events" element={<Events />} />
          <Route path="achivments" element={<Achivments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="docs" element={<ApiDocs />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="homework" element={<HomeWork />} />
          <Route path="admin" element={<Admin />} />
          <Route path="test_contest" element={<Contest />} />
          <Route path="profile/:user_id" element={<ViewProfile />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="login_to/:app_id" element={<OAuth />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
