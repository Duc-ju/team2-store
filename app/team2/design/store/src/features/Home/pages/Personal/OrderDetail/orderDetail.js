import React, { PureComponent } from 'react';
import classes from './orderDetail.module.scss';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import Chip from '@mui/material/Chip';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrintIcon from '@mui/icons-material/Print';
import ElectricBoltIcon from '@mui/icons-material/Money';
import FlashOnIcon from '@mui/icons-material/FlashOn';

class OrderDetail extends PureComponent {
    render() {
        return (
            <section className={classes.root}>
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
                                <span>In thông tin đơn hàng</span>
                            </button>
                        </div>
                    </div>
                    <div className={classes.itemSection}>
                        <ListItem />
                    </div>
                    <div className={classes.orderDetail}>
                        <ul>
                            <li>
                                <span>Tổng đơn hàng</span>
                                <span>127.000đ</span>
                            </li>
                            <li>
                                <span>Phí vận chuyển</span>
                                <span>20.000đ</span>
                            </li>
                            <li>
                                <span>Mã giảm giá</span>
                                <span className={classes.discount}>
                                    -20.000đ
                                </span>
                            </li>
                            <li>
                                <span>Tổng thanh toán</span>
                                <span className={classes.totalPrice}>
                                    117.000đ
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.orderInfo}>
                        <div className={classes.shipment}>
                            <h2 className={classes.title}>
                                Thông tin vận chuyển
                            </h2>
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
                                        <ElectricBoltIcon />
                                    </span>
                                    <span>Vận chuyển nhanh</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.payment}>
                            <h2 className={classes.title}>
                                Thông tin thanh toán
                            </h2>
                            <div className={classes.paymentContainer}>
                                <div>
                                    <span>
                                        <FlashOnIcon />
                                    </span>
                                    <span>Thanh toán khi nhận hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

OrderDetail.propTypes = {};

export default OrderDetail;
