import React from 'react';
import PropTypes from 'prop-types';
import Product from '../../components/Product';
import { Grid, Pagination } from '@mui/material';
import { MainContainer } from '../../components/Container';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import HeaderTitle from '../../components/HeaderTitle';
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;
function Body(props) {
  return (
    <MainContainer>
      <HeaderTitle
        Icon={SearchIcon}
        title='Sản phẩm tìm kiếm'
        color='primary'
      />
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
        <Grid item xs={3}>
          <Product />
        </Grid>
      </Grid>
      <PaginationContainer>
        <Pagination count={10} variant='outlined' color='primary' />
      </PaginationContainer>
    </MainContainer>
  );
}

Body.propTypes = {};

export default Body;
