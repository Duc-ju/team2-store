import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    IconButton,
    Rating,
    Typography
} from '@mui/material';
import classes from './cartOverview.module.scss';
import React, { useState, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import cartSlice from '../Header/cartSlice';
import noticeSlice from '../../redux/noticeSlice';
import normalizeNumber from '../../logic/normalizeNumber';
import cartApi from '../../api/cartApi';
import QuantityField from '../QuantityField';

function CartItem({ item }) {
    return (
        <div className={classes.itemContainer}>
            <Card>
                <Link to={`/${item.type}/${item.id}`}>
                    <CardMedia
                        component="img"
                        image={
                            item.images[0]
                                ? `${process.env.REACT_APP_API_URL}${item.images[0].img}`
                                : process.env.PUBLIC_URL + '/images/box.png'
                        }
                        alt={item.title}
                    />
                    <CardContent sx={{ p: 1 }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                                textAlign: 'center',
                                fontSize: 12,
                                color: 'primary.main',
                                p: 0,
                                m: 0,
                                border: 'none'
                            }}
                        >
                            {`${normalizeNumber(
                                item.price * (1 - item.discount)
                            )}đ`}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions sx={{ pt: 0 }}>
                    <QuantityField item={item} />
                </CardActions>
            </Card>
        </div>
    );
}

function CartOverview() {
    const cart = useSelector(cartSelector);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(cartSlice.actions.close());
    };

    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;

    const navigate = useNavigate();

    const handleClickCheckout = () => {
        dispatch(cartSlice.actions.close());
        navigate('/cart/check-out');
    };

    if (cart.current === null) return null;

    return (
        <>
            <div
                className={`${classes.container} shadow-short cart ${(() => {
                    if (firstRender) {
                        return cart.isShown ? 'show' : 'hide';
                    }
                    return cart.isShown ? 'slide-in' : 'hide';
                })()}`}
            >
                <div className={classes.content}>
                    <div
                        className={`${classes.closeButton} ${
                            !cart.isShown ? classes.hidden : ''
                        }`}
                        onClick={(e) => handleClose(e)}
                    >
                        &#10006;
                    </div>
                    <div className={classes.header}>
                        {cart.current.quantity > 0 ? (
                            <>
                                <span className={classes.subtotal}>
                                    Tổng tiền
                                </span>
                                <span
                                    className={classes.subtotalNumber}
                                >{`${normalizeNumber(
                                    cart.current.total
                                )}đ`}</span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    disableElevation
                                    sx={{
                                        my: '12px',
                                        borderRadius: '0.75rem',
                                        fontSize: '12px',
                                        p: '2px',
                                        textTransform: 'none'
                                    }}
                                    onClick={handleClickCheckout}
                                >
                                    Thanh toán
                                </Button>
                                <Divider sx={{ width: '100%' }} />
                            </>
                        ) : (
                            <>
                                <div>Giỏ hàng trống</div>
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.body}>
                    {cart.current.cartProducts.map((cartProduct) => (
                        <CartItem key={cartProduct.id} item={cartProduct} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default memo(CartOverview);
