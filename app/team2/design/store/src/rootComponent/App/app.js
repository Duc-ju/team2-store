import React, { Suspense, useLayoutEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    Redirect,
    Link,
    useLocation
} from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Loading from '../../components/Loading';
import Login from '../../features/Login';
import Home from '../../features/Home';
import Register from '../../features/Register';
import ScrollToTop from '../../router/ScrollToTop';
import SnackNotice from '../../components/SnackNotice';
import GlobalStyles from '../GlobalStyles';
import CartOverview from '../../components/CartOverView/CartOverview';
import { addDocument } from '../../firebase/services';
import bookApi from '../../api/bookApi';
import { useDispatch } from 'react-redux';
import productSlice from '../../redux/productSlice';
import clothesApi from '../../api/clothesApi';
import laptopApi from '../../api/laptopApi';

function App() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <GlobalStyles>
                        <ScrollToTop>
                            <Routes>
                                <Route path="/*" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <SnackNotice />
                            <CartOverview />
                        </ScrollToTop>
                    </GlobalStyles>
                </BrowserRouter>
            </Suspense>
        </>
    );
}

export default App;
