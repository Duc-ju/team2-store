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
import { useDispatch, useSelector } from 'react-redux';
import noticeSlice from '../../../../../redux/noticeSlice';
import shuffle from '../../../../../logic/shuffle';
import normalizeNumber from '../../../../../logic/normalizeNumber';
import { userSelector } from '../../../../../redux/selectors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Button } from '@mui/material';

const shipmentMethods = {
    normal: 'Vận chuyển thường',
    fast: 'Vận chuyển nhanh'
};

const paymentMethods = {
    cash: 'Thanh toán khi nhận hàng',
    paypal: 'Thanh toán bằng Paypal'
};

const orderStatuses = {
    process: {
        icon: <PendingActionsIcon />,
        title: 'Đang xử lý'
    },
    shipping: {
        icon: <LocalShippingIcon />,
        title: 'Đang vận chuyển'
    },
    completed: {
        icon: <CheckIcon />,
        title: 'Đã hoàn thành'
    },
    canceled: {
        icon: <CancelPresentationIcon />,
        title: 'Đã huỷ'
    }
};
const OrderDetail = () => {
    const [order, setOrder] = useState();
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector).current;
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
    const handleCancelOrder = () => {
        orderApi
            .cancelOrder(order.id)
            .then((order) => {
                console.log(order);
                setOrder(order);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'success',
                        title: 'Huỷ đơn hàng thành công'
                    })
                );
            })
            .catch((e) => {
                console.log(e);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Huỷ đơn hàng thành không công'
                    })
                );
            });
    };

    return (
        <section className={classes.root} ref={printComponentRef}>
            <div className={classes.container}>
                <div className={classes.titleSection}>
                    <div className={classes.orderName}>
                        <h2 className={classes.title}>
                            {`Chi tiết đơn hàng 000000${order.id}`}
                        </h2>
                        <Chip
                            icon={<>{orderStatuses[order.status].icon}</>}
                            label={orderStatuses[order.status].title}
                            variant="outlined"
                            sx={{ backgroundColor: 'white', padding: '0 6px' }}
                        />
                    </div>
                    <div>
                        {order.status === 'process' && (
                            <Button
                                variant="contained"
                                onClick={handleCancelOrder}
                            >
                                Huỷ đơn hàng
                            </Button>
                        )}
                    </div>
                </div>
                <div className={classes.controlSection}>
                    <div>
                        <span>{order.createAt.slice(0, 10)}</span>
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
                    <ListItem order={order} cart={cart} />
                </div>
                <div className={classes.orderDetail}>
                    <ul>
                        <li>
                            <span>{`Tổng tiền hàng (${cart.quantity} sản phẩm):`}</span>
                            <span>{normalizeNumber(cart.total)}</span>
                        </li>
                        <li>
                            <span>Phí vận chuyển</span>
                            <span>{normalizeNumber(order.shipment.cost)}</span>
                        </li>
                        <li>
                            <span>Mã giảm giá</span>
                            <span className={classes.discount}>0đ</span>
                        </li>
                        <li>
                            <span>Tổng thanh toán</span>
                            <span className={classes.totalPrice}>
                                {normalizeNumber(
                                    order.shipment.cost + cart.total
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={classes.orderInfo}>
                    <div className={classes.shipment}>
                        <h2 className={classes.title}>Thông tin vận chuyển</h2>
                        <div className={classes.shipmentContainer}>
                            <span>{user.displayName}</span>
                            <span>{order.shipment.phone}</span>
                            <span>{order.shipment.address}</span>
                            <span>{order.shipment.createAt.slice(0, 10)}</span>
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
                                <span>
                                    {shipmentMethods[order.shipment.type]}
                                </span>
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
                                <span>
                                    {paymentMethods[order.payment.type]}
                                </span>
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
