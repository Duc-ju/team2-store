import React from 'react';
import classes from './orderList.module.scss';
import OrderTable from './orderTable';

function OrderList(props) {
    return (
        <section className={classes.root}>
            <div className={classes.container}>
                <h2 className={classes.title}>Đơn hàng của bạn</h2>
                <OrderTable />
            </div>
        </section>
    );
}

export default OrderList;
