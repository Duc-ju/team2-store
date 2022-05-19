import React, { useEffect, useState, useMemo } from 'react';
import classes from './body.module.scss';
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
    Typography
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Shortcut from '../../components/Shortcut';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    CustomSelect,
    StyledOption
} from '../../../../components/CustomSelect';
import HeaderTitle from '../../components/HeaderTitle';
import Product from '../../components/Product';
import { useParams } from 'react-router-dom';
import dictionary from './dictionary';
import { LoadingButton } from '@mui/lab';
import cartApi from '../../../../api/cartApi';
import { useSelector, useDispatch } from 'react-redux';
import {
    cartSelector,
    productSelector,
    userSelector
} from '../../../../redux/selectors';
import noticeSlice from '../../../../redux/noticeSlice';
import cartSlice from '../../../../components/Header/cartSlice';
import { useNavigate } from 'react-router-dom';
import productItemApi from '../../../../api/productItemApi';
import pendingRedirectSlice from '../../../../redux/pendingRedirectSlice';
import RatingAndComment from './ratingAndComment';
import ProductDetailShimmer from './productDetail.shimmer';
import useFirestore from '../../../../customHooks/useFirestore';

const LinkItem = (props) => {
    const { link, content, style } = props;

    return (
        <Link to={link}>
            <div className={classes.infoContainer} style={style}>
                {content}
            </div>
        </Link>
    );
};

function Body(props) {
    const { typeProduct, id } = useParams();
    const products = useSelector(productSelector);
    const cart = useSelector(cartSelector);
    const [addingToCart, setAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const itemRef = products[typeProduct].find((item) => `${item.id}` === id);
    const item = (() => {
        if (!itemRef) return;
        if (typeProduct === 'book') return dictionary.getBook(itemRef);
        if (typeProduct === 'clothes') return dictionary.getClothes(itemRef);
        if (typeProduct === 'laptop') return dictionary.getLaptop(itemRef);
    })();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const location = useLocation();
    const handleAddToCart = () => {
        if (user.current == null) {
            navigate('/login');
            dispatch(
                pendingRedirectSlice.actions.create({
                    path: location.pathname
                })
            );
            dispatch(
                noticeSlice.actions.show({
                    title: 'Đăng nhập để tiếp tục',
                    type: 'info'
                })
            );
        } else {
            setAddingToCart(true);
            cartApi
                .addItemToCart({
                    cartId: cart.current.id,
                    itemId: item.id,
                    type: typeProduct
                    // quantity: quantity
                })
                .then((productItem) => {
                    setAddingToCart(false);
                    dispatch(
                        noticeSlice.actions.show({
                            title: 'Thêm sản phẩm vào giỏ hàng thành công',
                            type: 'success'
                        })
                    );
                    dispatch(cartSlice.actions.setUpdate(productItem));
                    dispatch(cartSlice.actions.show());
                })
                .catch((e) => {
                    setAddingToCart(false);
                    console.log(e);
                    dispatch(
                        noticeSlice.actions.show({
                            title: 'Đã có lỗi xảy ra',
                            type: 'error'
                        })
                    );
                });
        }
    };

    const commentCondition = useMemo(() => {
        return {
            fieldName: 'pid',
            operator: '==',
            compareValue: item?.id
        };
    }, []);

    const comments = useFirestore('comment', commentCondition);

    return (
        <>
            {item ? (
                <>
                    <div className={classes.roundedWhiteContainer}>
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            separator="›"
                            sx={{ fontSize: '14px' }}
                        >
                            <div className={classes.coverLink}>
                                <Link to={item.breadcrumb.link}>
                                    {item.breadcrumb.display}
                                </Link>
                            </div>
                            <Typography
                                color="text.primary"
                                sx={{ fontSize: '14px' }}
                            >
                                {item.header}
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={classes.roundedWhiteContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <ImageList
                                    sx={{ width: '100%', height: 'auto', m: 0 }}
                                    cols={1}
                                    rowHeight="auto"
                                >
                                    <ImageListItem
                                        sx={{
                                            borderRadius: '0.75rem',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img
                                            src={item.images[0].image}
                                            srcSet={item.images[0].image}
                                            alt={item.header}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                </ImageList>
                                <ImageList
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        my: 0.5
                                    }}
                                    cols={5}
                                    rowHeight="auto"
                                >
                                    {item.images.map((image) => (
                                        <ImageListItem
                                            key={image.id}
                                            sx={{
                                                borderRadius: '0.75rem',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <img
                                                src={image.image}
                                                srcSet={image.image}
                                                alt={item.header}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.headerContainer}>
                                    <h2 className={classes.header}>
                                        {item.header}
                                    </h2>
                                    <div className={classes.rowFlexContainer}>
                                        <LinkItem link="/" content="4.6" />
                                        <Rating
                                            name="rating"
                                            size="small"
                                            readOnly
                                            defaultValue={3}
                                            precision={1}
                                        />
                                        <Divider
                                            orientation="vertical"
                                            sx={{ mx: 1 }}
                                            flexItem
                                        />
                                        <LinkItem link="/" content="16.3k" />{' '}
                                        đánh giá
                                        <Divider
                                            orientation="vertical"
                                            sx={{ mx: 2 }}
                                            flexItem
                                        />
                                        <LinkItem link="/" content="36.3k" /> đã
                                        bán
                                    </div>
                                    <div
                                        className={classes.rowFlexContainer}
                                        style={{ marginTop: '8px' }}
                                    >
                                        {item.brand.title}
                                        <LinkItem
                                            link={item.brand.link}
                                            content={item.brand.value}
                                            style={{
                                                marginLeft: '4px',
                                                fontWeight: 600
                                            }}
                                        />
                                    </div>
                                    <MainContainer
                                        style={{
                                            backgroundColor: 'var(--bg-base)',
                                            padding: '8px 16px'
                                        }}
                                    >
                                        <div
                                            className={classes.rowFlexContainer}
                                        >
                                            <div
                                                style={{
                                                    textDecoration:
                                                        'line-through',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                {`${item.originPrice}đ`}
                                            </div>
                                            <div
                                                style={{
                                                    color: 'var(--bg-primary)',
                                                    fontSize: '24px',
                                                    fontWeight: 600,
                                                    marginLeft: '8px'
                                                }}
                                            >
                                                {`${item.price}đ`}
                                            </div>
                                            <Chip
                                                label={`${item.discount}% giảm`}
                                                variant="filled"
                                                color="error"
                                                size="small"
                                                sx={{ ml: 1 }}
                                                className="bg-red-linear"
                                            />
                                        </div>
                                    </MainContainer>
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                        <Grid item xs={2}>
                                            <div
                                                className={
                                                    classes.centerHeightContainer
                                                }
                                            >
                                                Màu sắc
                                            </div>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                            border: '1px solid var(--text-primary)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius:
                                                                '0.75rem'
                                                        }}
                                                    >
                                                        Đỏ
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                            border: '1px solid var(--text-primary)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius:
                                                                '0.75rem'
                                                        }}
                                                    >
                                                        Xanh
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                            border: '1px solid var(--text-primary)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius:
                                                                '0.75rem'
                                                        }}
                                                    >
                                                        Cam
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                            border: '1px solid var(--text-primary)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius:
                                                                '0.75rem'
                                                        }}
                                                    >
                                                        Vàng
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ marginTop: 1 }}
                                    >
                                        <Grid item xs={2}>
                                            <div
                                                className={
                                                    classes.centerHeightContainer
                                                }
                                            >
                                                Số lượng
                                            </div>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <CustomSelect
                                                value={quantity}
                                                sx={{ fontSize: '14px' }}
                                                onChange={(e) => setQuantity(e)}
                                            >
                                                <StyledOption
                                                    value={1}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    1
                                                </StyledOption>
                                                <StyledOption
                                                    value={2}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    2
                                                </StyledOption>
                                                <StyledOption
                                                    value={3}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    3
                                                </StyledOption>
                                                <StyledOption
                                                    value={4}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    4
                                                </StyledOption>
                                                <StyledOption
                                                    value={5}
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    5
                                                </StyledOption>
                                            </CustomSelect>
                                        </Grid>
                                    </Grid>
                                    <div
                                        className={classes.buttonGroupContainer}
                                    >
                                        <LoadingButton
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '0.75rem'
                                            }}
                                            startIcon={<AddShoppingCartIcon />}
                                            loading={addingToCart}
                                            loadingPosition="start"
                                            onClick={handleAddToCart}
                                            disabled={item.cart === null}
                                        >
                                            Thêm vào giỏ hàng
                                        </LoadingButton>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '0.75rem'
                                            }}
                                        >
                                            Mua ngay
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className={classes.flexBoxColumn}>
                                    <Shortcut
                                        Icon={CompareArrowsIcon}
                                        title="Sản phẩm tương tự"
                                        className="bg-blue-linear"
                                        link="/filter/likely"
                                    />
                                    <Shortcut
                                        Icon={AddCircleIcon}
                                        title="Sản phẩm thường được mua kèm"
                                        className="bg-red-linear"
                                        link="/filter/likely"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Grid container spacing={4}>
                        <Grid item xs={9.5}>
                            <div
                                className={classes.roundedWhiteContainer}
                                style={{ padding: '16px' }}
                            >
                                <h2 className={classes.contentHeader}>
                                    Chi tiết sản phẩm
                                </h2>
                                <div className={classes.detailContainer}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <div
                                                className={
                                                    classes.rowFlexContainer
                                                }
                                            >
                                                Danh mục
                                            </div>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <div
                                                className={
                                                    classes.rowFlexContainer
                                                }
                                            >
                                                <Breadcrumbs
                                                    aria-label="breadcrumb"
                                                    separator="›"
                                                    sx={{ fontSize: '14px' }}
                                                >
                                                    <div
                                                        className={
                                                            classes.coverLink
                                                        }
                                                    >
                                                        <Link
                                                            to={
                                                                item.breadcrumb
                                                                    .link
                                                            }
                                                        >
                                                            {
                                                                item.breadcrumb
                                                                    .display
                                                            }
                                                        </Link>
                                                    </div>
                                                    <Typography
                                                        color="text.primary"
                                                        sx={{
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        {item.header}
                                                    </Typography>
                                                </Breadcrumbs>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    {item.listDetail.map((detail) => (
                                        <Grid
                                            container
                                            spacing={2}
                                            key={detail.title}
                                        >
                                            <Grid item xs={2}>
                                                <div
                                                    className={
                                                        classes.rowFlexContainer
                                                    }
                                                >
                                                    {detail.title}
                                                </div>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div
                                                    className={
                                                        classes.rowFlexContainer
                                                    }
                                                >
                                                    {detail.link ? (
                                                        <LinkItem
                                                            link={detail.link}
                                                            content={
                                                                detail.value
                                                            }
                                                            style={{
                                                                margin: 0,
                                                                marginLeft:
                                                                    '4px',
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    ) : (
                                                        detail.value
                                                    )}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                                <h2 className={classes.contentHeader}>
                                    Mô tả sản phẩm
                                </h2>
                                <div
                                    className={classes.descriptionContainer}
                                    dangerouslySetInnerHTML={{
                                        __html: item.description
                                    }}
                                ></div>
                            </div>
                            <RatingAndComment comments={comments} />
                            <HeaderTitle
                                Icon={CompareArrowsIcon}
                                color="primary"
                                title="Sản phẩm tương tự"
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
                                        title="Xem tất cả"
                                        className="bg-blue-linear"
                                        link="/filter/likely"
                                    />
                                </Grid>
                            </Grid>
                            <HeaderTitle
                                Icon={AddCircleIcon}
                                title="Sản phẩm thường được mua kèm"
                                style={{ marginTop: '16px' }}
                            />
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={2.4}>
                                    <Shortcut
                                        Icon={AddCircleIcon}
                                        title="Xem tất cả"
                                        className="bg-red-linear"
                                        link="/filter/likely"
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
                            <div className={classes.baseContainer}>
                                <HeaderTitle
                                    style={{ padding: '8px' }}
                                    title="Sản phẩm hot"
                                    Icon={LocalFireDepartmentIcon}
                                    color="error"
                                />
                            </div>
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
                <ProductDetailShimmer />
            )}
        </>
    );
}

Body.propTypes = {};

export default Body;
