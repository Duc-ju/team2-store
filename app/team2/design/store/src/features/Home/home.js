import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetail from './pages/ProductDetail';
import FilterPage from './pages/FilterPage';
import Persional from './pages/Persional';
import CheckOutPage from './pages/CheckoutPage';

function Home() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart/check-out" element={<CheckOutPage />} />
            <Route path="product/:params" element={<FilterPage />} />
            <Route path="personal/" element={<Persional />} />
            <Route path=":id" element={<ProductDetail />} />
        </Routes>
    );
}

export default Home;
