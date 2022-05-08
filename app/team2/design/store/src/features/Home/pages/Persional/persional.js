import React from 'react';
import Profile from './Profile';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import { Routes, Route } from 'react-router-dom';
function Persional() {
    return (
        <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
    );
}

export default Persional;
