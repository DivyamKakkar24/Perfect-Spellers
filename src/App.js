import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Entry from './components/pages/Entry';
import Home from './components/pages/Home';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, [navigate]);

  return (
    <Routes>
    <Route path="login" element={<Entry />} />
    <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
