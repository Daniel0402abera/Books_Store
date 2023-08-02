import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bookstore from './components/pages/Bookstore';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookstore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
