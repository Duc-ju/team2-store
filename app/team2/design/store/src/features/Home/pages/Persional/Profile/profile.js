import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../../../components/Header';
import Footer from '../../../../../components/Footer';
import Body from './Body';

function Profile(props) {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
}

Profile.propTypes = {};

export default Profile;
