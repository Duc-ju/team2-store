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

export default function ListItem() {
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
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={classes.imgCell}
                            >
                                <div className={classes.img}>
                                    <img
                                        src={
                                            'http://localhost:8000/media/images/126_laptophitech_vn_lenovo_thinkpad_t460s__7__1.jpg'
                                        }
                                    />
                                </div>
                            </TableCell>
                            <TableCell className={classes.productName}>
                                <span>Laptop Thinkpad T460s ngon bổ rẻ</span>
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.quantityField}
                            >
                                <span>2</span>
                            </TableCell>
                            <TableCell align="center" className={classes.price}>
                                <span>
                                    15.000<span>đ</span>
                                </span>
                            </TableCell>
                            <TableCell
                                align="center"
                                className={classes.subTotal}
                            >
                                <span>
                                    15.000<span>đ</span>
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
