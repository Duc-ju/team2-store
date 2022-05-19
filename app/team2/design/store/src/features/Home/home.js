import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetail from './pages/ProductDetail';
import FilterPage from './pages/FilterPage';
import Personal from './pages/Personal';
import CheckOutPage from './pages/CheckoutPage';
import NotFound from '../../components/NotFound';

function Home() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart/check-out" element={<CheckOutPage />} />
            <Route path="product/:type" element={<FilterPage />} />
            <Route path="personal/*" element={<Personal />} />
            <Route path=":typeProduct/:id" element={<ProductDetail />} />
            <Route element={<NotFound />} />
        </Routes>
    );
}

export default Home;
