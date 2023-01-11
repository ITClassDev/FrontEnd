import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import BaseLayout from "./Components/Layout";

import { getUser } from "./api";

const Home = lazy(() => import("./Pages/Home"));
const Events = lazy(() => import("./Pages/Events"));
const Achivments = lazy(() => import("./Pages/Achivments"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const ApiDocs = lazy(() => import("./Pages/ApiDocs"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Challenge = lazy(() => import("./Pages/Challenge"));
const Admin = lazy(() => import("./Pages/Admin"));
const HomeWork = lazy(() => import("./Pages/HomeWork"));
const Contest = lazy(() => import("./Pages/Contest"));
const ViewProfile = lazy(() => import("./Pages/ViewProfile"));
const LeaderBoard = lazy(() => import("./Pages/LeaderBoard"));
const OAuth = lazy(() => import("./Pages/OAuth"));
const Settings = lazy(() => import("./Pages/Settings"));
const Apps = lazy(() => import("./Pages/Apps"));
const StatisticPage = lazy(() => import("./Pages/Statistic"));

export default function App() {
  const [userData, setUserData] = useState({ status: 0 });
  const [backendStatus, setBackendStatus] = useState("Online");
  useEffect(() => {
    console.log(String.raw`
Welcome to, 
 _____ _    _ _______ _____  _ 
/ ____| |  | |__   __|  __ \| |
| (___| |__| |  | |  | |__) | |
\___ \|  __  |  | |  |  ___/| |
____) | |  | |  | |  | |    |_|
|____/|_|  |_|  |_|  |_|    (_)
                               
`);
    getUser(
      (resp) => {
        setUserData({ status: 1, user: resp.data.user });
      },
      (resp) => {
        setUserData({ status: 2 });
        if (resp.code === "ERR_NETWORK") {
          setBackendStatus("Offline");
        }
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout
              user={userData}
              setUserData={setUserData}
              backendStatus={backendStatus}
            />
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home user={userData} />
              </Suspense>
            }
          />
          <Route
            path="events"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Events />
              </Suspense>
            }
          />
          <Route
            path="achivments"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Achivments />
              </Suspense>
            }
          />
          <Route
            path="notifications"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="docs"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ApiDocs />
              </Suspense>
            }
          />
          <Route
            path="challenge"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Challenge />
              </Suspense>
            }
          />
          <Route
            path="apps"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Apps />
              </Suspense>
            }
          />
          <Route
            path="homework"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomeWork />
              </Suspense>
            }
          />
          <Route
            path="admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Admin user={userData} />
              </Suspense>
            }
          />
          <Route
            path="test_contest"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Contest />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ViewProfile />
              </Suspense>
            }
          />
          <Route
            path="stats"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <StatisticPage />
              </Suspense>
            }
          />
          <Route
            path="leaderboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LeaderBoard />
              </Suspense>
            }
          />
          <Route
            path="login_to"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OAuth />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Settings user={userData} />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
