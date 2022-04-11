import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetail from './pages/ProductDetail';
import FilterPage from './pages/FilterPage';
import Persional from './pages/Persional';
function index() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='product/:params' element={<FilterPage />} />
      <Route path='persional/' element={<Persional />} />
      <Route path=':type/:id' element={<ProductDetail />} />
    </Routes>
  );
}

export default index;
