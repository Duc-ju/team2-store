import React from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { AppContainer, Container } from '../../components/Container';
import Body from './body';

function CheckOutPage(props) {
    return (
        <AppContainer>
            <Header />
            <Body />
            <Footer />
        </AppContainer>
    );
}

export default CheckOutPage;
