import React from 'react';
import PropTypes from 'prop-types';
import { AppContainer } from '../../components/Container';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Body from './body';

function ProductDetail(props) {
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

ProductDetail.propTypes = {};

export default ProductDetail;
