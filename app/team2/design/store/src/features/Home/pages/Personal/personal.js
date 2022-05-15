import React, { useEffect } from 'react';
import Profile from './Profile';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppContainer } from '../../components/Container';
import { Grid } from '@mui/material';
import LeftNav from './leftNav';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../redux/selectors';
import noticeSlice from '../../../../redux/noticeSlice';
import useLoginRequire from '../../../../customHooks/useLoginRequire';

function Personal() {
    useLoginRequire();

    return (
        <>
            <AppContainer>
                <Grid container spacing={2}>
                    <Grid item xs={2.7}>
                        <LeftNav />
                    </Grid>
                    <Grid item xs={9.3} style={{ position: 'relative' }}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Profile />} />
                            <Route path="/orders" element={<OrderList />} />
                            <Route
                                path="/orders/:id"
                                element={<OrderDetail />}
                            />
                        </Routes>
                        <Footer />
                    </Grid>
                </Grid>
            </AppContainer>
        </>
    );
}

export default Personal;
