import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import { MainContainer } from '../../components/Container';
import Chip from '@mui/material/Chip';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Rating,
  Skeleton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Shortcut from '../../components/Shortcut';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  CustomSelect,
  StyledOption,
} from '../../../../components/CustomSelect';
import HeaderTitle from '../../components/HeaderTitle';
import Product from '../../components/Product';
import { useParams } from 'react-router-dom';
import bookApi from '../../../../api/bookApi';
import dictionary from './dictionary';
import { LoadingButton } from '@mui/lab';
import cartApi from '../../../../api/cartApi';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../../../redux/selectors';
import noticeSlice from '../../../../redux/noticeSlice';
import cartSlice from '../../../../components/Header/cartSlice';
import { useNavigate } from 'react-router-dom';
const RoundedWhiteContainer = styled.div`
  border-radius: 0.75rem;
  background-color: white;
  padding: 8px;
  margin-top: 16px;
`;
const BaseContainer = styled.div`
  margin-top: 16px;
`;
const FlexBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  > * {
    padding: 16px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const HeaderContainer = styled.div`
  padding: 0 16px;
`;
const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const RowFlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
const InfoContainer = styled.div`
  color: var(--bg-primary);
  margin-right: 4px;
`;
const CenterHeightContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const LinkItem = (props) => {
  const { link, content, style } = props;

  return (
    <Link to={link}>
      <InfoContainer style={style}>{content}</InfoContainer>
    </Link>
  );
};
const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  > *:not(:last-child) {
    margin-right: 32px;
  }
`;
const ContentHeader = styled.div`
  background-color: var(--bg-base);
  border-radius: 0.75rem;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
`;
const DetailContainer = styled.div`
  margin-top: 16px;
  padding-left: 8px;
  > *:not(:first-child) {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 16px;
  }
`;
const DesciprionContainer = styled.p`
  padding-left: 8px;
  white-space: pre-wrap;
  line-height: 2.2;
  font-size: 15px;
`;
const CoverLink = styled.div`
  margin-left: 4px;
`;

function Body(props) {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (type === 'book') {
      bookApi
        .get(id)
        .then((book) => {
          setItem(dictionary.getBook(book));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (user.current == null) {
      navigate('/login');
      dispatch(
        noticeSlice.actions.show({
          title: 'Đăng nhập để tiếp tục',
          type: 'info',
        })
      );
    } else {
      setAddingToCart(true);
      cartApi
        .addItemToCart({
          cartId: user.current.cart,
          bookItem: item.id,
          quantity: quantity,
        })
        .then((cart) => {
          setAddingToCart(false);
          console.log(cart);
          dispatch(
            noticeSlice.actions.show({
              title: 'Thêm sản phẩm vào giỏ hàng thành công',
              type: 'success',
            })
          );
          dispatch(cartSlice.actions.setSuccess(cart));
          dispatch(cartSlice.actions.show());
        })
        .catch((e) => {
          setAddingToCart(false);
          console.log(e);
          dispatch(
            noticeSlice.actions.show({
              title: 'Đã có lỗi xảy ra',
              type: 'error',
            })
          );
        });
    }
  };

  return (
    <>
      {item ? (
        <>
          <RoundedWhiteContainer>
            <Breadcrumbs
              aria-label='breadcrumb'
              separator='›'
              sx={{ fontSize: '14px' }}
            >
              <CoverLink>
                <Link to={item.breadcrumb.link}>{item.breadcrumb.display}</Link>
              </CoverLink>
              <Typography color='text.primary' sx={{ fontSize: '14px' }}>
                {item.header}
              </Typography>
            </Breadcrumbs>
          </RoundedWhiteContainer>
          <RoundedWhiteContainer>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <ImageList
                  sx={{ width: '100%', height: 'auto', m: 0 }}
                  cols={1}
                  rowHeight='auto'
                >
                  <ImageListItem
                    sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}
                  >
                    <img
                      src={item.images[0].image}
                      srcSet={item.images[0].image}
                      alt={item.header}
                      loading='lazy'
                    />
                  </ImageListItem>
                </ImageList>
                <ImageList
                  sx={{
                    width: '100%',
                    height: 'auto',
                    my: 0.5,
                  }}
                  cols={5}
                  rowHeight='auto'
                >
                  {item.images.map((image) => (
                    <ImageListItem
                      key={image.id}
                      sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}
                    >
                      <img
                        src={image.image}
                        srcSet={image.image}
                        alt={item.header}
                        loading='lazy'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={6}>
                <HeaderContainer>
                  <Header>{item.header}</Header>
                  <RowFlexContainer>
                    <LinkItem link='/' content='4.6' />
                    <Rating
                      name='rating'
                      size='small'
                      readOnly
                      defaultValue={3}
                      precision={1}
                    />
                    <Divider orientation='vertical' sx={{ mx: 1 }} flexItem />
                    <LinkItem link='/' content='16.3k' /> đánh giá
                    <Divider orientation='vertical' sx={{ mx: 2 }} flexItem />
                    <LinkItem link='/' content='36.3k' /> đã bán
                  </RowFlexContainer>
                  <RowFlexContainer style={{ marginTop: '8px' }}>
                    {item.brand.title}
                    <LinkItem
                      link={item.brand.link}
                      content={item.brand.value}
                      style={{ marginLeft: '4px', fontWeight: 600 }}
                    />
                  </RowFlexContainer>
                  <MainContainer
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      padding: '8px 16px',
                    }}
                  >
                    <RowFlexContainer>
                      <div
                        style={{
                          textDecoration: 'line-through',
                          fontSize: '14px',
                        }}
                      >
                        {`${item.originPrice}đ`}
                      </div>
                      <div
                        style={{
                          color: 'var(--bg-primary)',
                          fontSize: '24px',
                          fontWeight: 600,
                          marginLeft: '8px',
                        }}
                      >
                        {`${item.price}đ`}
                      </div>
                      <Chip
                        label={`${item.discount}% giảm`}
                        variant='filled'
                        color='error'
                        size='small'
                        sx={{ ml: 1 }}
                        className='bg-red-linear'
                      />
                    </RowFlexContainer>
                  </MainContainer>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={2}>
                      <CenterHeightContainer>Màu sắc</CenterHeightContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Button
                            variant='outlined'
                            size='small'
                            sx={{
                              textTransform: 'none',
                              border: '1px solid var(--text-primary)',
                              color: 'var(--text-primary)',
                              borderRadius: '0.75rem',
                            }}
                          >
                            Đỏ
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant='outlined'
                            size='small'
                            sx={{
                              textTransform: 'none',
                              border: '1px solid var(--text-primary)',
                              color: 'var(--text-primary)',
                              borderRadius: '0.75rem',
                            }}
                          >
                            Xanh
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant='outlined'
                            size='small'
                            sx={{
                              textTransform: 'none',
                              border: '1px solid var(--text-primary)',
                              color: 'var(--text-primary)',
                              borderRadius: '0.75rem',
                            }}
                          >
                            Cam
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant='outlined'
                            size='small'
                            sx={{
                              textTransform: 'none',
                              border: '1px solid var(--text-primary)',
                              color: 'var(--text-primary)',
                              borderRadius: '0.75rem',
                            }}
                          >
                            Vàng
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item xs={2}>
                      <CenterHeightContainer>Số lượng</CenterHeightContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <CustomSelect
                        value={quantity}
                        sx={{ fontSize: '14px' }}
                        onChange={(e) => setQuantity(e)}
                      >
                        <StyledOption value={1} sx={{ fontSize: '14px' }}>
                          1
                        </StyledOption>
                        <StyledOption value={2} sx={{ fontSize: '14px' }}>
                          2
                        </StyledOption>
                        <StyledOption value={3} sx={{ fontSize: '14px' }}>
                          3
                        </StyledOption>
                        <StyledOption value={4} sx={{ fontSize: '14px' }}>
                          4
                        </StyledOption>
                        <StyledOption value={5} sx={{ fontSize: '14px' }}>
                          5
                        </StyledOption>
                      </CustomSelect>
                    </Grid>
                  </Grid>
                  <ButtonGroupContainer>
                    <LoadingButton
                      variant='contained'
                      size='large'
                      sx={{ textTransform: 'none', borderRadius: '0.75rem' }}
                      startIcon={<AddShoppingCartIcon />}
                      loading={addingToCart}
                      loadingPosition='start'
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </LoadingButton>
                    <Button
                      variant='outlined'
                      size='large'
                      sx={{ textTransform: 'none', borderRadius: '0.75rem' }}
                    >
                      Mua ngay
                    </Button>
                  </ButtonGroupContainer>
                </HeaderContainer>
              </Grid>
              <Grid item xs={3}>
                <FlexBoxColumn>
                  <Shortcut
                    Icon={CompareArrowsIcon}
                    title='Sản phẩm tương tự'
                    className='bg-blue-linear'
                    link='/filter/likely'
                  />
                  <Shortcut
                    Icon={AddCircleIcon}
                    title='Sản phẩm thường được mua kèm'
                    className='bg-red-linear'
                    link='/filter/likely'
                  />
                </FlexBoxColumn>
              </Grid>
            </Grid>
          </RoundedWhiteContainer>

          <Grid container spacing={4}>
            <Grid item xs={9.5}>
              <RoundedWhiteContainer style={{ padding: '16px' }}>
                <ContentHeader>Chi tiết sản phẩm</ContentHeader>
                <DetailContainer>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>Danh mục</RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Breadcrumbs
                          aria-label='breadcrumb'
                          separator='›'
                          sx={{ fontSize: '14px' }}
                        >
                          <CoverLink>
                            <Link to={item.breadcrumb.link}>
                              {item.breadcrumb.display}
                            </Link>
                          </CoverLink>
                          <Typography
                            color='text.primary'
                            sx={{ fontSize: '14px' }}
                          >
                            {item.header}
                          </Typography>
                        </Breadcrumbs>
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                  {item.listDetail.map((detail) => (
                    <Grid container spacing={2} key={detail.title}>
                      <Grid item xs={2}>
                        <RowFlexContainer>{detail.title}</RowFlexContainer>
                      </Grid>
                      <Grid item xs={10}>
                        <RowFlexContainer>
                          {detail.link ? (
                            <LinkItem
                              link={detail.link}
                              content={detail.value}
                              style={{
                                margin: 0,
                                marginLeft: '4px',
                                fontWeight: 600,
                              }}
                            />
                          ) : (
                            detail.value
                          )}
                        </RowFlexContainer>
                      </Grid>
                    </Grid>
                  ))}
                </DetailContainer>
                <ContentHeader>Mô tả sản phẩm</ContentHeader>
                <DesciprionContainer>{item.description}</DesciprionContainer>
              </RoundedWhiteContainer>
              <HeaderTitle
                Icon={CompareArrowsIcon}
                color='primary'
                title='Sản phẩm tương tự'
                style={{ marginTop: '16px' }}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Shortcut
                    Icon={CompareArrowsIcon}
                    title='Xem tất cả'
                    className='bg-blue-linear'
                    link='/filter/likely'
                  />
                </Grid>
              </Grid>
              <HeaderTitle
                Icon={AddCircleIcon}
                title='Sản phẩm thường được mua kèm'
                style={{ marginTop: '16px' }}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={2.4}>
                  <Shortcut
                    Icon={AddCircleIcon}
                    title='Xem tất cả'
                    className='bg-red-linear'
                    link='/filter/likely'
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2.5}>
              <BaseContainer>
                <HeaderTitle
                  style={{ padding: '8px' }}
                  title='Sản phẩm hot'
                  Icon={LocalFireDepartmentIcon}
                  color='error'
                />
              </BaseContainer>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12}>
                  <Product />
                </Grid>
                <Grid item xs={12}>
                  <Product />
                </Grid>
                <Grid item xs={12}>
                  <Product />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <RoundedWhiteContainer>
            <Skeleton variant='text' sx={{ height: 32, width: '50%' }} />
          </RoundedWhiteContainer>
          <RoundedWhiteContainer>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Skeleton width='100%' height='250px' variant='rectangular' />
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid item xs={2.4}>
                    <Skeleton
                      width='100%'
                      height='40px'
                      variant='rectangular'
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Skeleton
                      width='100%'
                      height='40px'
                      variant='rectangular'
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Skeleton
                      width='100%'
                      height='40px'
                      variant='rectangular'
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Skeleton
                      width='100%'
                      height='40px'
                      variant='rectangular'
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Skeleton
                      width='100%'
                      height='40px'
                      variant='rectangular'
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <HeaderContainer>
                  <Header>
                    <Skeleton variant='text' sx={{ height: 32 }} />
                  </Header>
                  <RowFlexContainer>
                    <Skeleton
                      variant='text'
                      sx={{ height: 32, width: '50%' }}
                    />
                  </RowFlexContainer>
                  <RowFlexContainer style={{ marginTop: '8px' }}>
                    <Skeleton
                      variant='text'
                      sx={{ height: 32, width: '50%' }}
                    />
                  </RowFlexContainer>
                  <MainContainer
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      padding: '8px 16px',
                    }}
                  >
                    <RowFlexContainer>
                      <Skeleton
                        variant='text'
                        sx={{ width: '100px', height: '32px' }}
                      />
                      <Skeleton
                        variant='text'
                        sx={{ width: '100px', height: '32px', ml: 1 }}
                      />
                    </RowFlexContainer>
                  </MainContainer>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={2}>
                      <Skeleton
                        variant='text'
                        sx={{ width: '100%', height: '32px', ml: 1 }}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Skeleton
                        variant='text'
                        sx={{ width: '100%', height: '32px', ml: 1 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={2}>
                      <Skeleton
                        variant='text'
                        sx={{ width: '100%', height: '32px', ml: 1 }}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Skeleton
                        variant='text'
                        sx={{ width: '50%', height: '32px', ml: 1 }}
                      />
                    </Grid>
                  </Grid>
                  <ButtonGroupContainer>
                    <Skeleton
                      variant='text'
                      sx={{ height: '32px', width: '100px' }}
                    />
                    <Skeleton
                      variant='text'
                      sx={{ height: '32px', width: '100px' }}
                    />
                  </ButtonGroupContainer>
                </HeaderContainer>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Skeleton
                      width='100%'
                      height='150px'
                      variant='rectangular'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton
                      width='100%'
                      height='150px'
                      variant='rectangular'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </RoundedWhiteContainer>

          <Grid container spacing={4}>
            <Grid item xs={9.5}>
              <RoundedWhiteContainer style={{ padding: '16px' }}>
                <Skeleton variant='text' sx={{ height: 32, width: '50%' }} />
                <DetailContainer>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '100%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '60%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '100%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '60%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '100%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '60%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '100%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '60%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '100%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                    <Grid item xs={10}>
                      <RowFlexContainer>
                        <Skeleton
                          variant='text'
                          sx={{ height: 32, width: '60%' }}
                        />
                      </RowFlexContainer>
                    </Grid>
                  </Grid>
                </DetailContainer>
                <ContentHeader>
                  <Skeleton variant='text' sx={{ height: 32, width: '50%' }} />
                </ContentHeader>
                <DesciprionContainer>
                  <Skeleton variant='text' sx={{ height: 32, width: '100%' }} />
                  <Skeleton variant='text' sx={{ height: 32, width: '40%' }} />
                  <Skeleton variant='text' sx={{ height: 32, width: '80%' }} />
                  <Skeleton variant='text' sx={{ height: 32, width: '70%' }} />
                  <Skeleton variant='text' sx={{ height: 32, width: '50%' }} />
                  <Skeleton variant='text' sx={{ height: 32, width: '60%' }} />
                </DesciprionContainer>
              </RoundedWhiteContainer>
              <HeaderTitle
                Icon={CompareArrowsIcon}
                color='primary'
                title='Sản phẩm tương tự'
                style={{ marginTop: '16px' }}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Shortcut
                    Icon={CompareArrowsIcon}
                    title='Xem tất cả'
                    className='bg-blue-linear'
                    link='/filter/likely'
                  />
                </Grid>
              </Grid>
              <HeaderTitle
                Icon={AddCircleIcon}
                title='Sản phẩm thường được mua kèm'
                style={{ marginTop: '16px' }}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={2.4}>
                  <Shortcut
                    Icon={AddCircleIcon}
                    title='Xem tất cả'
                    className='bg-red-linear'
                    link='/filter/likely'
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
                <Grid item xs={2.4}>
                  <Product showControl={false} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2.5}>
              <BaseContainer>
                <HeaderTitle
                  style={{ padding: '8px' }}
                  title='Sản phẩm hot'
                  Icon={LocalFireDepartmentIcon}
                  color='error'
                />
              </BaseContainer>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12}>
                  <Product />
                </Grid>
                <Grid item xs={12}>
                  <Product />
                </Grid>
                <Grid item xs={12}>
                  <Product />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

Body.propTypes = {};

export default Body;
