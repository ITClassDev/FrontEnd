import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import BaseLayout from "./Components/Layout";
import LoadingBar from "./Components/Loading";

import { API } from "./api";

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
const Poll = lazy(() => import("./Pages/Poll"));
const PollsAdmin = lazy(() => import("./Pages/PollsAdmin"));

export default function App() {
  const [userData, setUserData] = useState({ status: 0 });
  const [backendStatus, setBackendStatus] = useState("Online");
  useEffect(() => {
    //console.log("[index.js] Get user");
    console.log(String.raw`
Welcome to, 
 _____ _    _ _______ _____  _ 
/ ____| |  | |__   __|  __ \| |
| (___| |__| |  | |  | |__) | |
\___ \|  __  |  | |  |  ___/| |
____) | |  | |  | |  | |    |_|
|____/|_|  |_|  |_|  |_|    (_)
                              
`);
    API({
      endpoint: "/auth/me", ok: (resp) => {
        setUserData({ status: 1, user: resp.data.user });
      }, err: (resp) => {
        if (resp.status !== 403) // This http code says, that we have invalid auth code, but backend works correctly
          setBackendStatus("Offline");
      }
    });
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
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Home user={userData} />
              </Suspense>
            }
          />
          <Route
            path="events"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Events />
              </Suspense>
            }
          />
          <Route
            path="achivments"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Achivments />
              </Suspense>
            }
          />
          <Route
            path="notifications"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="docs"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <ApiDocs />
              </Suspense>
            }
          />
          <Route
            path="challenge"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Challenge />
              </Suspense>
            }
          />
          <Route
            path="apps"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Apps />
              </Suspense>
            }
          />
          <Route
            path="homework"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <HomeWork />
              </Suspense>
            }
          />
          <Route
            path="admin"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Admin user={userData} />
              </Suspense>
            }
          />
          <Route
            path="contest"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Contest />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <ViewProfile />
              </Suspense>
            }
          />
          <Route
            path="stats"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <StatisticPage />
              </Suspense>
            }
          />
          <Route
            path="leaderboard"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <LeaderBoard />
              </Suspense>
            }
          />
          <Route
            path="login_to"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <OAuth />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LoadingBar size={24} text="Loading..." />}>
                <Settings user={userData} />
              </Suspense>
            }

          />
          <Route
            path="polls"
            element={<Suspense fallback={<>Loading</>}><PollsAdmin user={userData}/></Suspense>}
          />
        </Route>
        <Route
          path="poll"
          element={<Suspense fallback={<>Loading</>}><Poll /></Suspense>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
