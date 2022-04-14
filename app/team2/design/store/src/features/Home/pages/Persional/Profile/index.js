import React from 'react';
import PropTypes from 'prop-types';
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import Body from "./Body"

function index(props) {
  return <>
    <Header />
    <Body />
    <Footer />
  </>;
}

index.propTypes = {};

export default index;
