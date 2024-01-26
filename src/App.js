import React from 'react';
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Dashboard from './Dashboard';
import Charts from './Charts';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </div>
  );
}

export default App;
