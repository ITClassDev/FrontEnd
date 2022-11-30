import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Events from './Pages/Events';
import Achivments from './Pages/Achivments';
import BaseLayout from './Components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} ind={'1'}/>
          <Route path="events" element={<Events />} />
          <Route path="achivments" element={<Achivments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
