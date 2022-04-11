import { Grid } from '@mui/material';
import React from 'react';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import { AppContainer } from '../../components/Container';
import Body from './Body';
import LeftNav from './LeftNav';
export default function FilterPage() {
  return (
    <>
      <AppContainer>
        <Grid container spacing={2}>
          <Grid item xs={2.7}>
            <LeftNav />
          </Grid>
          <Grid item xs={9.3} style={{ position: 'relative' }}>
            <Header />
            <Body style={{ height: '300vh' }} />
            <Footer />
          </Grid>
        </Grid>
      </AppContainer>
    </>
  );
}
