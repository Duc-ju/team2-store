import classes from './orderTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Link } from 'react-router-dom';

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

export default function OrderTable() {
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
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell
                                component="th"
                                scope="row"
                                className={classes.imgCell}
                            >
                                <span>000000017</span>
                            </TableCell>
                            <TableCell>
                                <span>29/04/22</span>
                            </TableCell>
                            <TableCell>
                                <span>duc56 duc</span>
                            </TableCell>
                            <TableCell>
                                <span>175.000.000đ</span>
                            </TableCell>
                            <TableCell className={classes.status}>
                                <span>
                                    <PendingActionsIcon />
                                </span>
                                <span>Đang xử lý</span>
                            </TableCell>
                            <TableCell>
                                <Link to={'/personal/orders/1'}>
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
