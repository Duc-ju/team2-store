import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Redirect, Link } from 'react-router-dom';
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

function App() {
    // useEffect(() => {
    //     addDocument('comment', {
    //         pid: 1,
    //         uid: 1,
    //         orderId: 1,
    //         star: 4,
    //         comment: 'Sản phẩm rất tốt'
    //     });
    // }, []);

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
