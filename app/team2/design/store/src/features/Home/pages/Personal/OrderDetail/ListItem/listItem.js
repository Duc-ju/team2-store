import { useEffect, useMemo, useState } from 'react';
import classes from './listItem.module.scss';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import normalizeNumber from '../../../../../../logic/normalizeNumber';
import RatingModal from './ratingModal';
import useFirestore from '../../../../../../customHooks/useFirestore';
import { Link } from 'react-router-dom';

export default function ListItem({ order, cart }) {
    const [openRatingModal, setOpenRatingModal] = useState({
        status: false,
        productReview: null
    });

    const handleCloseRatingModal = () =>
        setOpenRatingModal({
            status: false,
            productReview: null
        });

    const handleOpenReview = (cartProduct) => {
        setOpenRatingModal({
            status: true,
            productReview: { ...cartProduct }
        });
    };
    const commentCondition = useMemo(() => {
        return {
            fieldName: 'oid',
            operator: '==',
            compareValue: order.id
        };
    }, [order]);
    const comments = useFirestore('rating', commentCondition);
    console.log(comments);
    cart.cartProducts = cart.cartProducts.map((cartProduct) => {
        const comment = comments.filter(
            (comment) => comment.pid === `${cartProduct.type}-${cartProduct.id}`
        );
        if (comment.length === 1) cartProduct.comment = comment[0];
        return { ...cartProduct };
    });
    console.log({ cart });
    if (!order || !cart) return null;
    return (
        <TableContainer component={Paper} className={classes.rootClass}>
            <Table
                aria-label="customized table"
                className={`${classes.table} shadow-linear`}
            >
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell align="left">Sản phẩm</TableCell>
                        <TableCell />
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Giá</TableCell>
                        <TableCell align="center">Tổng giá</TableCell>
                        {order.status === 'completed' && (
                            <TableCell align="center"></TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartProducts.map((cartProduct) => (
                        <TableRow key={`${cartProduct.type}-${cartProduct.id}`}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={classes.imgCell}
                            >
                                <div className={classes.img}>
                                    <Link
                                        to={`/${cartProduct.type}/${cartProduct.id}/`}
                                    >
                                        <img
                                            src={
                                                (cartProduct.images &&
                                                    cartProduct.images[0] &&
                                                    process.env
                                                        .REACT_APP_API_URL +
                                                        cartProduct.images[0]
                                                            .img) ||
                                                process.env.PUBLIC_URL +
                                                    '/images/box.png'
                                            }
                                        />
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className={classes.productName}>
                                <span>{cartProduct.title}</span>
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.quantityField}
                            >
                                <span>{'1'}</span>
                            </TableCell>
                            <TableCell align="center" className={classes.price}>
                                <span>
                                    {`${normalizeNumber(
                                        cartProduct.price *
                                            (1 - cartProduct.discount)
                                    )}`}
                                    <span>đ</span>
                                </span>
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.subTotal}
                            >
                                <span>
                                    {`${normalizeNumber(
                                        cartProduct.price *
                                            (1 - cartProduct.discount)
                                    )}`}
                                    <span>đ</span>
                                </span>
                            </TableCell>
                            {order.status === 'completed' && (
                                <TableCell
                                    align="center"
                                    className={classes.ratingButton}
                                >
                                    <p
                                        onClick={() =>
                                            handleOpenReview(cartProduct)
                                        }
                                    >
                                        {cartProduct.comment
                                            ? 'Xem đánh giá'
                                            : 'Đánh giá'}
                                    </p>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <RatingModal
                openRatingModal={openRatingModal}
                handleCloseRatingModal={handleCloseRatingModal}
                orderId={order.id}
            />
        </TableContainer>
    );
}
