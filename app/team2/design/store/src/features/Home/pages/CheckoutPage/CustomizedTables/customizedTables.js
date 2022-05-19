import * as React from 'react';
import classes from './customizedTables.module.scss';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import QuantityField from '../../../../../components/QuantityField';
import { cartSelector } from '../../../../../redux/selectors';
import { useSelector } from 'react-redux';
import normalizeNumber from '../../../../../logic/normalizeNumber';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
    padding: '8px'
}));

const StyledTableCellHeader = styled(StyledTableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    },
    background: '#fff'
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function CustomizedTables() {
    const cart = useSelector(cartSelector).current;
    return (
        <TableContainer component={Paper} className={classes.rootClass}>
            <Table
                aria-label="customized table"
                className={`${classes.table} shadow-linear`}
            >
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <StyledTableCellHeader align="left">
                            Sản phẩm
                        </StyledTableCellHeader>
                        <StyledTableCellHeader />
                        <StyledTableCellHeader align="center">
                            Số lượng
                        </StyledTableCellHeader>
                        <StyledTableCellHeader align="center">
                            Giá
                        </StyledTableCellHeader>
                        <StyledTableCellHeader align="center">
                            Tổng giá
                        </StyledTableCellHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartProducts.map((cartProduct) => (
                        <StyledTableRow key={cartProduct.id}>
                            <StyledTableCell
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
                            </StyledTableCell>
                            <StyledTableCell className={classes.productName}>
                                <span>{cartProduct.title}</span>
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.quantityField}
                            >
                                <QuantityField item={cartProduct} />
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.price}
                            >
                                <span>
                                    {normalizeNumber(
                                        cartProduct.price *
                                            (1 - cartProduct.discount)
                                    )}
                                    <span>đ</span>
                                </span>
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.subTotal}
                            >
                                <span>
                                    {normalizeNumber(
                                        cartProduct.price *
                                            (1 - cartProduct.discount)
                                    )}
                                    <span>đ</span>
                                </span>
                            </StyledTableCell>
                            {/*<StyledTableCell align="center">*/}
                            {/*    <span className={classes.closeButton}>*/}
                            {/*        <span>&#10006;</span>*/}
                            {/*    </span>*/}
                            {/*</StyledTableCell>*/}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
