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
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import cartSlice from './cartSlice';
import noticeSlice from '../../redux/noticeSlice';
import normalizeNumber from '../../logic/normalizeNumber';
import cartApi from '../../api/cartApi';

function ItemControl({ item }) {
    const [openInput, setOpenInput] = useState(item.quantity > 10);
    const [inputQuantity, setInputQuantity] = useState(item.quantity);
    const [isFocusInput, setIsFocusInput] = useState(false);
    const cart = useSelector(cartSelector);
    const dispatch = useDispatch();
    const deleteItem = () => {
        cartApi
            .deleteItem({
                cartId: cart.current.id,
                cartProductId: item.id
            })
            .then(() => {
                dispatch(cartSlice.actions.setDelete(item.id));
                dispatch(
                    noticeSlice.actions.show({
                        title: 'Xoá sản phẩm thành công',
                        type: 'success'
                    })
                );
            })
            .catch(() => {
                dispatch(
                    noticeSlice.actions.show({
                        title: 'Xoá sản phẩm không thành công',
                        type: 'error'
                    })
                );
            });
    };
    const handleChangeQuantity = (e) => {
        let newQuantity = e.target.value;
        if (newQuantity === '0') {
            deleteItem();
        } else if (newQuantity === '>10') {
            setOpenInput(true);
        } else {
            cartApi
                .updateItem({
                    quantity: newQuantity,
                    cartProductId: item.id
                })
                .then((cartProduct) => {
                    dispatch(cartSlice.actions.setUpdate(cartProduct));
                    dispatch(
                        noticeSlice.actions.show({
                            title: 'Đã cập nhật',
                            type: 'success'
                        })
                    );
                })
                .catch(() => {
                    dispatch(
                        noticeSlice.actions.show({
                            title: 'Có lỗi xảy ra',
                            type: 'error'
                        })
                    );
                });
        }
    };
    const handleInputChange = () => {
        cartApi
            .updateItem({
                cartProductId: item.id,
                quantity: inputQuantity
            })
            .then((cartProduct) => {
                dispatch(cartSlice.actions.setUpdate(cartProduct));
                dispatch(
                    noticeSlice.actions.show({
                        title: 'Đã cập nhật',
                        type: 'success'
                    })
                );
                if (inputQuantity <= 10) setOpenInput(false);
            })
            .catch(() => {
                dispatch(
                    noticeSlice.actions.show({
                        title: 'Có lỗi xảy ra',
                        type: 'error'
                    })
                );
            });
    };
    return (
        <>
            <div className={classes.containerRow}>
                <div className={classes.containerFlex}>
                    {openInput ? (
                        <>
                            <input
                                className={classes.input}
                                type="number"
                                value={inputQuantity}
                                onChange={(e) =>
                                    setInputQuantity(e.target.value)
                                }
                                onFocus={() => setIsFocusInput(true)}
                                onBlur={() =>
                                    setTimeout(() => {
                                        setIsFocusInput(false);
                                    }, 300)
                                }
                            />
                            {isFocusInput && (
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        lineHeight: '1.2',
                                        fontSize: '0.7rem',
                                        borderRadius: '0.75rem',
                                        minWidth: '30px',
                                        marginTop: '4px'
                                    }}
                                    color="error"
                                    onClick={handleInputChange}
                                >
                                    Lưu
                                </Button>
                            )}
                        </>
                    ) : (
                        <select
                            className={classes.select}
                            defaultValue={item.quantity}
                            onChange={handleChangeQuantity}
                        >
                            <option value="0">0 (Xoá)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value=">10">{'>10'}</option>
                        </select>
                    )}
                </div>
                <div className={classes.containerFlex}>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => deleteItem()}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
}

function CartItem({ item }) {
    return (
        <div className={classes.itemContainer}>
            <Card>
                <Link to="/">
                    <CardMedia
                        component="img"
                        image={`${process.env.REACT_APP_API_URL}${item.productItem.images[0].image}`}
                        alt={item.productItem.header}
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
                                item.productItem.prices *
                                    (1 - item.productItem.discount)
                            )}đ`}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions sx={{ pt: 0 }}>
                    <ItemControl item={item} />
                </CardActions>
            </Card>
        </div>
    );
}

function CartOverview() {
    const cart = useSelector(cartSelector);
    const dispatch = useDispatch();
    const cartElement = useRef();
    useEffect(() => {
        const handleClose = (e) => {
            if (!cartElement.current.contains(e.target)) {
                cartElement.current.classList.add('slide-out');
                setTimeout(() => {
                    dispatch(cartSlice.actions.close());
                }, 490);
            }
        };
        window.addEventListener('click', handleClose);
        return () => window.removeEventListener('click', handleClose);
    }, []);

    return (
        <>
            {cart.current !== null && (
                <div
                    className={`${classes.container} shadow-short cart`}
                    ref={cartElement}
                >
                    <div className={classes.content}>
                        <div className={classes.header}>
                            <span className={classes.subtotal}>Tổng tiền</span>
                            <span
                                className={classes.subtotalNumber}
                            >{`${normalizeNumber(cart.current.total)}đ`}</span>
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
                            >
                                Thanh toán
                            </Button>
                            <Divider sx={{ width: '100%' }} />
                        </div>
                    </div>
                    <div className={classes.body}>
                        {cart.current.cartProducts.map((cartProduct) => (
                            <CartItem key={cartProduct.id} item={cartProduct} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default CartOverview;
