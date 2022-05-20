import React, { useEffect, useState } from 'react';
import classes from './body.module.scss';
import CustomizedTables from './CustomizedTables';
import { AppContainer } from '../../components/Container';
import Header from '../../../../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../../../components/InputField';
import CheckBoxField from '../../../../components/CheckBoxField';
import LoadingButton from '@mui/lab/LoadingButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, userSelector } from '../../../../redux/selectors';
import normalizeNumber from '../../../../logic/normalizeNumber';
import noticeSlice from '../../../../redux/noticeSlice';
import SelectField from '../../../../components/SelectField';
import TextField from '@mui/material/TextField';
import orderApi from '../../../../api/orderApi';

const paymentMethods = [
    {
        value: 'cash',
        label: 'Thanh toán khi nhận hàng'
    },
    {
        value: 'paypal',
        label: 'Thanh toán bằng Paypal'
    }
];

const shipmentMethods = [
    {
        value: 'normal',
        label: 'Vận chuyển thường'
    },
    {
        value: 'fast',
        label: 'Vận chuyển nhanh'
    }
];

const shipmentQuery = {
    normal: 20000,
    fast: 40000
};

function Body(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector).current;
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [shipmentType, setShipmentType] = useState('normal');
    const cart = useSelector(cartSelector).current;
    useEffect(() => {
        if (cart !== null && cart.quantity === 0) {
            navigate('/');
            dispatch(
                noticeSlice.actions.show({
                    type: 'error',
                    title: 'Giỏ hàng trống'
                })
            );
        }
    });

    const handleSubmit = (datas) => {
        const shipment = {};
        shipment.type = shipmentType;
        shipment.cost = shipmentQuery[shipmentType];
        shipment.address = datas.shipDetail;
        shipment.phone = datas.shipPhone;
        const paypal = {};
        paypal.number = datas.paymentNumber;
        paypal.bank = datas.paymentBank;
        paypal.content = datas.paymentDescription;
        paypal.totalAmount = cart.total + shipmentQuery[shipmentType];
        const cash = {};
        cash.totalAmount = cart.total + shipmentQuery[shipmentType];
        let order;
        if (paymentMethod === 'paypal') {
            order = { shipment, paypal };
        } else {
            order = { shipment, cash };
        }
        orderApi
            .addOrder(user.id, cart.id, order)
            .then((order) => {
                navigate(`/personal/orders/${order.id}`);
                dispatch({
                    type: 'success',
                    title: 'Thanh toán đơn hàng thành công'
                });
            })
            .catch((e) => {
                console.log(e);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Thanh toán đơn hàng không thành công'
                    })
                );
            });
    };
    const initialValues = {
        shipName: user.displayName,
        shipDetail: '',
        shipPhone: '',
        paymentNumber: '',
        paymentDescription: '',
        paymentBank: '',
        paymentTotal: `${normalizeNumber(
            cart.total + shipmentQuery[shipmentType]
        )}đ`,
        voucher: ''
    };
    const validationSchema = Yup.object().shape({
        shipName: Yup.string().required('Vui lòng nhập tên người nhận'),
        shipDetail: Yup.string().required('Vui lòng nhập địa chỉ chi tiết'),
        shipPhone: Yup.string().required('Vui lòng nhập số điện thoại'),
        paymentNumber:
            paymentMethod === 'paypal' &&
            Yup.string().required('Vui lòng nhập số thẻ'),
        paymentBank:
            paymentMethod === 'paypal' &&
            Yup.string().required('Vui lòng nhập tên ngân hàng'),
        voucher: Yup.string()
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => {
                return (
                    <Form className={classes.root}>
                        <section className={`${classes.leftRow}`}>
                            <div className={classes.shipment}>
                                <Card
                                    sx={{
                                        backgroundColor: 'unset',
                                        boxShadow: 'none'
                                    }}
                                >
                                    <CardContent>
                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div className={classes.groupTitle}>
                                                <Avatar
                                                    sx={{
                                                        m: 1
                                                    }}
                                                    className={
                                                        classes.iconTitle
                                                    }
                                                >
                                                    <LocalShippingIcon />
                                                </Avatar>
                                                <Typography
                                                    component="h1"
                                                    variant="h5"
                                                >
                                                    Thông tin vận chuyển
                                                </Typography>
                                            </div>
                                            <div className={classes.inputGroup}>
                                                <FastField
                                                    name="shipName"
                                                    component={InputField}
                                                    label="Tên đầy đủ"
                                                    autoComplete="ship-name"
                                                    size={'small'}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                                {/*<FastField*/}
                                                {/*    name="shipCity"*/}
                                                {/*    component={InputField}*/}
                                                {/*    label="Tỉnh/thành phố"*/}
                                                {/*    autoComplete="ship-city"*/}
                                                {/*    size={'small'}*/}
                                                {/*/>*/}
                                                {/*<div*/}
                                                {/*    className={*/}
                                                {/*        classes.columnInputGroup*/}
                                                {/*    }*/}
                                                {/*>*/}
                                                {/*    <FastField*/}
                                                {/*        name="shipDistrict"*/}
                                                {/*        component={InputField}*/}
                                                {/*        label="Quận/huyện"*/}
                                                {/*        autoComplete="ship-district"*/}
                                                {/*        size={'small'}*/}
                                                {/*    />*/}
                                                {/*    <FastField*/}
                                                {/*        name="shipCommune"*/}
                                                {/*        component={InputField}*/}
                                                {/*        label="Phường/xã"*/}
                                                {/*        autoComplete="ship-commune"*/}
                                                {/*        size={'small'}*/}
                                                {/*    />*/}
                                                {/*</div>*/}
                                                <FormControl
                                                    sx={{
                                                        width: '100%',
                                                        m: '16px 0 8px 0'
                                                    }}
                                                >
                                                    <InputLabel id="shipType">
                                                        'Phương thức vận chuyển'
                                                    </InputLabel>
                                                    <Select
                                                        value={shipmentType}
                                                        fullWidth
                                                        labelId={'shipType'}
                                                        id="shipType"
                                                        onChange={(e) =>
                                                            setShipmentType(
                                                                e.target.value
                                                            )
                                                        }
                                                        inputProps={{
                                                            'aria-label':
                                                                'Without label'
                                                        }}
                                                        label="Phương thức thanh toán"
                                                        autoComplete="shipType"
                                                        size="small"
                                                    >
                                                        {shipmentMethods.map(
                                                            (
                                                                shipmentMethod,
                                                                index
                                                            ) => (
                                                                <MenuItem
                                                                    value={
                                                                        shipmentMethod.value
                                                                    }
                                                                    key={index}
                                                                >
                                                                    {
                                                                        shipmentMethod.label
                                                                    }
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id={'shipCost'}
                                                    label="Phí vận chuyển"
                                                    name={'shipCost'}
                                                    value={
                                                        shipmentQuery[
                                                            shipmentType
                                                        ]
                                                    }
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    size={'small'}
                                                />
                                                <FastField
                                                    name="shipDetail"
                                                    component={InputField}
                                                    label="Địa chỉ chi tiết"
                                                    autoComplete="ship-detail"
                                                    size={'small'}
                                                />
                                                <FastField
                                                    name="shipPhone"
                                                    component={InputField}
                                                    label="Số điện thoại"
                                                    autoComplete="ship-phone"
                                                    size={'small'}
                                                />
                                            </div>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className={classes.payment}>
                                <Card
                                    sx={{
                                        backgroundColor: 'unset',
                                        boxShadow: 'none'
                                    }}
                                >
                                    <CardContent>
                                        <CssBaseline />
                                        <FormControl
                                            sx={{
                                                width: '100%',
                                                m: '16px 0 8px 0'
                                            }}
                                        >
                                            <InputLabel id="shipmentMethod">
                                                'Phương thức thanh toán'
                                            </InputLabel>
                                            <Select
                                                value={paymentMethod}
                                                fullWidth
                                                labelId={'shipmentMethod'}
                                                id="shipmentMethod"
                                                onChange={(e) =>
                                                    setPaymentMethod(
                                                        e.target.value
                                                    )
                                                }
                                                inputProps={{
                                                    'aria-label':
                                                        'Without label'
                                                }}
                                                label="Phương thức thanh toán"
                                                autoComplete="shipmentMethod"
                                                size="small"
                                            >
                                                {paymentMethods.map(
                                                    (shipmentMethod, index) => (
                                                        <MenuItem
                                                            value={
                                                                shipmentMethod.value
                                                            }
                                                            key={index}
                                                        >
                                                            {
                                                                shipmentMethod.label
                                                            }
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                        {paymentMethod === 'paypal' ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div
                                                    className={
                                                        classes.groupTitle
                                                    }
                                                >
                                                    <Avatar
                                                        sx={{
                                                            m: 1
                                                        }}
                                                        className={
                                                            classes.iconTitle
                                                        }
                                                    >
                                                        <PaidIcon />
                                                    </Avatar>
                                                    <Typography
                                                        component="h1"
                                                        variant="h5"
                                                    >
                                                        Thông tin thanh toán
                                                    </Typography>
                                                </div>
                                                <div
                                                    className={
                                                        classes.inputGroup
                                                    }
                                                >
                                                    <FastField
                                                        name="paymentNumber"
                                                        component={InputField}
                                                        label="Số thẻ"
                                                        autoComplete="paymentNumber"
                                                        size={'small'}
                                                    />
                                                    <FastField
                                                        name="paymentBank"
                                                        component={InputField}
                                                        label="Chọn ngân hàng"
                                                        autoComplete="paymentBank"
                                                        size={'small'}
                                                    />
                                                    <FastField
                                                        name="paymentDescription"
                                                        component={InputField}
                                                        label="Nội dung"
                                                        autoComplete="paymentTotal"
                                                        size={'small'}
                                                    />
                                                    <FastField
                                                        name="paymentTotal"
                                                        component={InputField}
                                                        label="Tổng số tiền thanh toán"
                                                        autoComplete="paymentTotal"
                                                        size={'small'}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                </div>
                                            </Box>
                                        ) : null}
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                        <section className={classes.rightRow}>
                            <div className={classes.cartItemList}>
                                <h2 className={classes.title}>
                                    Sản phẩm trong giỏ hàng
                                </h2>
                                <CustomizedTables />
                            </div>
                            <div className={`${classes.rightBottom}`}>
                                <h2 className={classes.title}>
                                    Xác nhận đơn hàng
                                </h2>
                                <div className={classes.rightBottomContent}>
                                    <div className={classes.voucher}>
                                        <FastField
                                            name="voucher"
                                            component={InputField}
                                            label="Nhập voucher"
                                            autoComplete="voucher"
                                            size={'small'}
                                        />
                                        <Button variant="contained">
                                            Áp dụng
                                        </Button>
                                    </div>
                                    <div className={classes.orderActions}>
                                        <ul className={classes.listPrice}>
                                            <li>
                                                <p>
                                                    <span>{`Tổng tiền hàng (${cart.quantity} sản phẩm):`}</span>
                                                    <span
                                                        className={
                                                            classes.normalPrice
                                                        }
                                                    >
                                                        {normalizeNumber(
                                                            cart.total
                                                        )}
                                                        <span>đ</span>
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <span>Phí ship:&nbsp;</span>
                                                    <span
                                                        className={
                                                            classes.normalPrice
                                                        }
                                                    >
                                                        {normalizeNumber(
                                                            shipmentQuery[
                                                                shipmentType
                                                            ]
                                                        )}
                                                        <span>đ</span>
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <span>Giảm giá:&nbsp;</span>
                                                    <span
                                                        className={
                                                            classes.discountPrice
                                                        }
                                                    >
                                                        0<span>đ</span>
                                                    </span>
                                                </p>
                                            </li>
                                            <li
                                                className={
                                                    classes.totalPriceContainer
                                                }
                                            >
                                                <p>
                                                    <span>
                                                        Tổng thanh toán:&nbsp;
                                                    </span>
                                                    <span
                                                        className={
                                                            classes.totalPrice
                                                        }
                                                    >
                                                        {normalizeNumber(
                                                            cart.total +
                                                                shipmentQuery[
                                                                    shipmentType
                                                                ]
                                                        )}
                                                        <span>đ</span>
                                                    </span>
                                                </p>
                                            </li>
                                        </ul>
                                        <LoadingButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            loading={false}
                                            loadingPosition="end"
                                            endIcon={
                                                <ShoppingCartCheckoutIcon />
                                            }
                                        >
                                            Đặt hàng
                                        </LoadingButton>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Body;
