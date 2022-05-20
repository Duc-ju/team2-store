import React, { useState, useEffect } from 'react';
import classes from './orderTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../../redux/selectors';
import orderApi from '../../../../../api/orderApi';
import noticeSlice from '../../../../../redux/noticeSlice';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

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
export default function OrderTable() {
    const user = useSelector(userSelector).current;
    const dispatch = useDispatch();
    const [listOrder, setListOrder] = useState();
    useEffect(() => {
        orderApi
            .getOrderList(user.id)
            .then((orders) => {
                console.log(orders);
                setListOrder(orders);
            })
            .catch((e) => {
                console.log(e);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Tải danh sách đơn hàng không thành công'
                    })
                );
            });
    }, [user]);
    if (!listOrder) return null;
    console.log(listOrder);
    return (
        <TableContainer component={Paper} className={classes.rootClass}>
            <Table
                aria-label="customized table"
                className={`${classes.table} shadow-linear`}
            >
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Mã đơn hàng</TableCell>
                        <TableCell>Ngày đặt</TableCell>
                        <TableCell>Tài khoản đặt</TableCell>
                        <TableCell>Tổng đơn hàng</TableCell>
                        <TableCell>Tình trạng</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listOrder.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={classes.imgCell}
                            >
                                <span>{`000000${order.id}`}</span>
                            </TableCell>
                            <TableCell>
                                <span>{order.createAt.slice(0, 10)}</span>
                            </TableCell>
                            <TableCell>
                                <span>{user.displayName}</span>
                            </TableCell>
                            <TableCell>
                                <span>{`${order.payment.totalAmount}đ`}</span>
                            </TableCell>
                            <TableCell className={classes.status}>
                                <span>{orderStatuses[order.status].icon}</span>
                                <span>{orderStatuses[order.status].title}</span>
                            </TableCell>
                            <TableCell>
                                <Link to={`/personal/orders/${order.id}`}>
                                    <span className={classes.openButton}>
                                        <span>Xem chi tiết</span>
                                    </span>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
