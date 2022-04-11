import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Redirect, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import Login from './features/Login';
import Home from './features/Home';
import Register from './features/Register';
import ScrollToTop from './router/ScrollToTop';
import SnackNotice from './components/SnackNotice';

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path='/*' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <SnackNotice />
          </ScrollToTop>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
