import React from 'react';
import classes from './body.module.scss';
import CustomizedTables from './CustomizedTables';
import { AppContainer } from '../../components/Container';
import Header from '../../../../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Button, Card, CardContent } from '@mui/material';
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
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

function Body(props) {
    const handleSubmit = (data) => {
        console.log(data);
    };
    const initialValues = {
        shipName: '',
        shipCity: '',
        shipDistrict: '',
        shipCommune: '',
        shipDetail: '',
        shipPhone: '',
        paymentNumber: '',
        paymentName: '',
        paymentBank: '',
        paymentExp: '',
        voucher: ''
    };
    const validationSchema = Yup.object().shape({
        shipName: Yup.string().required('Vui lòng nhập tên người nhận'),
        shipCity: Yup.string().required('Vui lòng nhập tỉnh/thành phố'),
        shipDistrict: Yup.string().required('Vui lòng nhập quận/huyện'),
        shipCommune: Yup.string().required('Vui lòng nhập phường/xã'),
        shipDetail: Yup.string().required('Vui lòng nhập địa chỉ chi tiết'),
        shipPhone: Yup.string().required('Vui lòng nhập số điện thoại'),
        paymentNumber: Yup.string().required('Vui lòng nhập số thẻ'),
        paymentName: Yup.string().required('Vui lòng nhập tên chủ thẻ'),
        paymentBank: Yup.string().required('Vui lòng nhập tên ngân hàng'),
        paymentExp: Yup.string().required('Vui lòng nhập hạn sử dụng của thẻ'),
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
                                                />
                                                <FastField
                                                    name="shipCity"
                                                    component={InputField}
                                                    label="Tỉnh/thành phố"
                                                    autoComplete="ship-city"
                                                    size={'small'}
                                                />
                                                <div
                                                    className={
                                                        classes.columnInputGroup
                                                    }
                                                >
                                                    <FastField
                                                        name="shipDistrict"
                                                        component={InputField}
                                                        label="Quận/huyện"
                                                        autoComplete="ship-district"
                                                        size={'small'}
                                                    />
                                                    <FastField
                                                        name="shipCommune"
                                                        component={InputField}
                                                        label="Phường/xã"
                                                        autoComplete="ship-commune"
                                                        size={'small'}
                                                    />
                                                </div>
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
                                                    <PaidIcon />
                                                </Avatar>
                                                <Typography
                                                    component="h1"
                                                    variant="h5"
                                                >
                                                    Thông tin thanh toán
                                                </Typography>
                                            </div>
                                            <div className={classes.inputGroup}>
                                                <FastField
                                                    name="paymentNumber"
                                                    component={InputField}
                                                    label="Số thẻ"
                                                    autoComplete="payment-number"
                                                    size={'small'}
                                                />
                                                <FastField
                                                    name="paymentName"
                                                    component={InputField}
                                                    label="Tên chủ thẻ"
                                                    autoComplete="payment-name"
                                                    size={'small'}
                                                />
                                                <FastField
                                                    name="paymentBank"
                                                    component={InputField}
                                                    label="Chọn ngân hàng"
                                                    autoComplete="payment-bank"
                                                    size={'small'}
                                                />
                                                <FastField
                                                    name="paymentExp"
                                                    component={InputField}
                                                    label="Hạn sử dụng"
                                                    autoComplete="payment-exp"
                                                    size={'small'}
                                                />
                                            </div>
                                        </Box>
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
                                                    <span>
                                                        Tổng tiền hàng:&nbsp;
                                                    </span>
                                                    <span
                                                        className={
                                                            classes.normalPrice
                                                        }
                                                    >
                                                        250.000<span>đ</span>
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
                                                        20.000<span>đ</span>
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
                                                        25.000<span>đ</span>
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
                                                        300.000<span>đ</span>
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
