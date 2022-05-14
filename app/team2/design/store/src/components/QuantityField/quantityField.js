import React, { useState } from 'react';
import classes from './quantityField.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import cartApi from '../../api/cartApi';
import cartSlice from '../Header/cartSlice';
import noticeSlice from '../../redux/noticeSlice';
import { Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function QuantityField({ item }) {
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

export default QuantityField;
