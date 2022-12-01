import React from 'react';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />}/>
          <Route path="events" element={<Events />} />
          <Route path="achivments" element={<Achivments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="docs" element={<ApiDocs />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
