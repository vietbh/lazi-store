// import { useState } from 'react'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Client from "./Client";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
        {/* Add more routes here */}
      </Routes>
  </BrowserRouter>
  );
}

export default App;
