import React from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Body from './Body';
import styled from 'styled-components';
import { AppContainer } from '../../components/Container';

export default function MainPage() {
    return (
        <>
            <AppContainer>
                <Header />
                <Body />
            </AppContainer>
            <Footer />
        </>
    );
}
