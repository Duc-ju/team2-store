import React, { useEffect } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { AppContainer, Container } from '../../components/Container';
import Body from './body';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../redux/selectors';
import { useNavigate } from 'react-router-dom';
import noticeSlice from '../../../../redux/noticeSlice';
import useLoginRequire from '../../../../customHooks/useLoginRequire';

function CheckOutPage(props) {
    useLoginRequire();
    return (
        <AppContainer>
            <Header />
            <Body />
            <Footer />
        </AppContainer>
    );
}

export default CheckOutPage;
