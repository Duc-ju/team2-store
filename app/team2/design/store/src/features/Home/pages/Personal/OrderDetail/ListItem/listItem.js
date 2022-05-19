import * as React from 'react';
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

export default function ListItem({ cart }) {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartProducts.map((cartProduct) => (
                        <TableRow key={cartProduct.id}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={classes.imgCell}
                            >
                                <div className={classes.img}>
                                    <img
                                        src={
                                            (cartProduct.images &&
                                                cartProduct.images[0]) ||
                                            process.env.PUBLIC_URL +
                                                '/images/box.png'
                                        }
                                    />
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
                            {/*<StyledTableCell align="center">*/}
                            {/*    <span className={classes.closeButton}>*/}
                            {/*        <span>&#10006;</span>*/}
                            {/*    </span>*/}
                            {/*</StyledTableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
