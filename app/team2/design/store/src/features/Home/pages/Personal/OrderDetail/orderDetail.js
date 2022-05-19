import React, { useEffect, useState } from 'react';
import classes from './orderDetail.module.scss';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import Chip from '@mui/material/Chip';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrintIcon from '@mui/icons-material/Print';
import ElectricBoltIcon from '@mui/icons-material/Money';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useReactToPrint } from 'react-to-print';
import orderApi from '../../../../../api/orderApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import noticeSlice from '../../../../../redux/noticeSlice';
import shuffle from '../../../../../logic/shuffle';
import normalizeNumber from '../../../../../logic/normalizeNumber';

const OrderDetail = () => {
    const [order, setOrder] = useState();
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        orderApi
            .getOrder(param.id)
            .then((orderFetch) => {
                setOrder(orderFetch);
            })
            .catch((e) => {
                console.log(e);
                navigate('/');
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Đơn hàng không tồn tại'
                    })
                );
            });
    }, []);

    const printComponentRef = React.useRef();
    const handlePrintOrder = useReactToPrint({
        content: () => printComponentRef.current
    });
    if (!order) return null;
    const cart = (() => {
        const cartRef = order.cart;
        const newCart = {};
        const cartProducts = shuffle([
            ...cartRef.bookItems,
            ...cartRef.clothesItems,
            ...cartRef.laptopItems
        ]);
        newCart.id = cartRef.id;
        newCart.cartProducts = cartProducts;
        newCart.quantity = cartProducts.length;
        newCart.total = cartProducts.reduce((previousValue, cartProduct) => {
            return (
                previousValue + cartProduct.price * (1 - cartProduct.discount)
            );
        }, 0);
        return newCart;
    })();
    console.log({
        order,
        cart
    });
    return (
        <section className={classes.root} ref={printComponentRef}>
            <div className={classes.container}>
                <div className={classes.titleSection}>
                    <h2 className={classes.title}>
                        Chi tiết đơn hàng 0000000117
                    </h2>
                    <Chip
                        icon={<PendingActionsIcon />}
                        label="Đang xử lý"
                        variant="outlined"
                        sx={{ backgroundColor: 'white' }}
                    />
                </div>
                <div className={classes.controlSection}>
                    <div>
                        <span>14 tháng 5, 2022</span>
                    </div>

                    <div>
                        <button>
                            <span>
                                <AutorenewIcon />
                            </span>
                            <span>Mua lại đơn hàng</span>
                        </button>
                        <button>
                            <span>
                                <PrintIcon />
                            </span>
                            <span onClick={handlePrintOrder}>
                                In thông tin đơn hàng
                            </span>
                        </button>
                    </div>
                </div>
                <div className={classes.itemSection}>
                    <ListItem cart={cart} />
                </div>
                <div className={classes.orderDetail}>
                    <ul>
                        <li>
                            <span>{`Tổng tiền hàng (${cart.quantity} sản phẩm):`}</span>
                            <span>{normalizeNumber(cart.total)}</span>
                        </li>
                        <li>
                            <span>Phí vận chuyển</span>
                            <span>20.000đ</span>
                        </li>
                        <li>
                            <span>Mã giảm giá</span>
                            <span className={classes.discount}>-20.000đ</span>
                        </li>
                        <li>
                            <span>Tổng thanh toán</span>
                            <span className={classes.totalPrice}>117.000đ</span>
                        </li>
                    </ul>
                </div>
                <div className={classes.orderInfo}>
                    <div className={classes.shipment}>
                        <h2 className={classes.title}>Thông tin vận chuyển</h2>
                        <div className={classes.shipmentContainer}>
                            <span>Nguyễn Tràng Đức</span>
                            <span>0963835711</span>
                            <span>Hà Nội</span>
                            <span>Thanh trì</span>
                            <span>Tả Thanh Oai</span>
                            <span>Ngõ 22, Siêu Quần</span>
                        </div>
                    </div>
                    <div className={classes.shipmentMethod}>
                        <h2 className={classes.title}>
                            Phương thức vận chuyển
                        </h2>
                        <div className={classes.shipmentMethodContainer}>
                            <div>
                                <span>
                                    <FlashOnIcon />
                                </span>
                                <span>Vận chuyển nhanh</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.payment}>
                        <h2 className={classes.title}>Thông tin thanh toán</h2>
                        <div className={classes.paymentContainer}>
                            <div>
                                <span>
                                    <ElectricBoltIcon />
                                </span>
                                <span>Thanh toán khi nhận hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

OrderDetail.propTypes = {};

export default OrderDetail;
