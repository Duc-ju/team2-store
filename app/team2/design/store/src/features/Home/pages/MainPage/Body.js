import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RecommendIcon from '@mui/icons-material/Recommend';
import {
  Button,
  Divider,
  Grid,
  MobileStepper,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import { Container, MainContainer } from '../../components/Container';
import HeaderTitle from '../../components/HeaderTitle';
import Product from '../../components/Product';
import Shortcut from '../../components/Shortcut';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    id: 1,
    link: '',
    imgPath:
      'https://salt.tikicdn.com/cache/w1080/ts/banner/bf/1d/7e/6bab74eb13b99026fdced744bf0643f4.png.webp',
  },
  {
    id: 2,
    link: 'Bird',
    imgPath:
      'https://salt.tikicdn.com/cache/w1080/ts/banner/ae/ab/c6/836017b7c3fcadf3abc733755a26c865.png.webp',
  },
  {
    id: 3,
    link: '',
    imgPath:
      'https://salt.tikicdn.com/cache/w1080/ts/banner/24/b6/cd/3ced499de1f249446412887c2f3fa995.jpg.webp',
  },
  {
    id: 4,
    link: '',
    imgPath:
      'https://salt.tikicdn.com/cache/w1080/ts/banner/0c/26/60/c5b6e5e8cec23a7096e8afde30cd9976.png.webp',
  },
];
const productList = [
  {
    id: 1,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
  {
    id: 2,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
  {
    id: 3,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
  {
    id: 4,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
  {
    id: 5,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
  {
    id: 6,
    link: '/book',
    imgPath:
      'https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp',
    alt: 'sách',
    displayName: 'Sách',
  },
];

function Body() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <>
      <MainContainer>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Container>
              <Container>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {images.map((step, index) => (
                    <div key={step.id}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component='img'
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
              </Container>
              <MobileStepper
                steps={maxSteps}
                position='static'
                activeStep={activeStep}
                style={{
                  transform: 'translatey(-100%)',
                  backgroundColor: 'transparent',
                }}
                nextButton={
                  <Button
                    size='small'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size='small'
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                  </Button>
                }
              />
            </Container>
          </Grid>
          <Grid item xs={4}>
            <Container>
              <Box
                component='img'
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src='https://salt.tikicdn.com/cache/w400/ts/banner/a6/90/5a/0ef8eef74e5dbceaba7c69f6bcf42337.png.webp'
                alt='tiki-khuyen-mai'
              />
            </Container>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: -4 }}>
          <Grid item xs={3}>
            <Shortcut
              link='/product/all'
              Icon={CategoryIcon}
              title='Xem tất cả sản phẩm'
              className='bg-blue-linear'
            />
          </Grid>
          {productList.map((product) => (
            <Grid item xs={1.5} key={product.id}>
              <Link to='/'>
                <Container
                  style={{ backgroundColor: 'white' }}
                  className='shadow-linear hover-effect'
                >
                  <div style={{ padding: '16px' }}>
                    <Box
                      component='img'
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        width: '100%',
                        borderRadius: 0.75,
                      }}
                      src={product.imgPath}
                      alt={product.alt}
                    />
                  </div>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 20,
                      bgcolor: 'background.default',
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {product.displayName}
                    </Typography>
                  </Paper>
                  <Divider variant='middle' />
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 30,
                      bgcolor: 'background.default',
                    }}
                  >
                    <Typography sx={{ fontWeight: 300, fontSize: 14 }}>
                      2 sản phẩm
                    </Typography>
                  </Paper>
                </Container>
              </Link>
            </Grid>
          ))}
        </Grid>
        <HeaderTitle
          style={{ marginTop: '2rem' }}
          Icon={LocalFireDepartmentIcon}
          color='error'
          title='Top Bán Chạy'
          link='/filter/top-sale'
        />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Shortcut
              Icon={LocalFireDepartmentIcon}
              title='Xem tất cả sản phẩm bán chạy'
              link='/filter/top-sale'
              className='bg-red-linear'
            />
          </Grid>
        </Grid>
        <HeaderTitle
          style={{ marginTop: '2rem' }}
          Icon={RecommendIcon}
          color='primary'
          title='Gợi ý cho bạn'
        />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={2}>
            <Shortcut
              Icon={RecommendIcon}
              title='Xem tất cả sản phẩm được đề xuất'
              link='/filter/recomended'
              className='bg-blue-linear'
            />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
          <Grid item xs={2}>
            <Product />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}

export default Body;
