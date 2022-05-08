import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, Button, Card, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FastField, Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CheckBoxField from '../../components/CheckBoxField';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import { handleRegister } from '../../redux/apiRequests';
import { userSelector } from '../../redux/selectors';
import { AppContainer } from '../Home/components/Container';
const theme = createTheme();

function Register() {
    const user = useSelector(userSelector);
    const initialValues = {
        username: '',
        displayName: '',
        email: '',
        password: '',
        rePassword: '',
        confirmTerm: false
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng nhập tên tài khoản'),

        displayName: Yup.string().required(
            'Vui lòng nhập tên bạn muốn hiển thị'
        ),

        email: Yup.string()
            .email('Email sai định dạng')
            .required('Vui lòng nhập email'),

        password: Yup.string()
            .min(8, 'Mật khẩu phải dài tối thiểu 8 kí tự')
            .required('Vui lòng nhập mật khẩu'),

        rePassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Mật khẩu không trùng khớp'
        ),

        confirmTerm: Yup.boolean().oneOf(
            [true],
            'Chấp nhận điều khoản để đăng kí'
        )
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (data) => {
        const { rePassword, confirmTerm, ...fullData } = data;
        handleRegister(fullData, dispatch, navigate);
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => {
                return (
                    <AppContainer>
                        <Header />
                        <ThemeProvider theme={theme}>
                            <Container
                                component="main"
                                maxWidth="xs"
                                sx={{ marginTop: 3 }}
                            >
                                <Card>
                                    <CardContent>
                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    m: 1,
                                                    bgcolor: 'secondary.main'
                                                }}
                                            >
                                                <LockOutlinedIcon />
                                            </Avatar>
                                            <Typography
                                                component="h1"
                                                variant="h5"
                                            >
                                                Đăng kí
                                            </Typography>
                                            {user.error && (
                                                <Alert
                                                    severity="error"
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    <AlertTitle>
                                                        {user.error}
                                                    </AlertTitle>
                                                </Alert>
                                            )}
                                            <Form>
                                                <FastField
                                                    name="username"
                                                    component={InputField}
                                                    label="Tài khoản"
                                                    autoFocus
                                                    autoComplete="username"
                                                />

                                                <FastField
                                                    name="email"
                                                    component={InputField}
                                                    label="Email"
                                                    type="email"
                                                    autoComplete="email"
                                                />

                                                <FastField
                                                    name="displayName"
                                                    component={InputField}
                                                    label="Tên hiển thị"
                                                    autoComplete="display-name"
                                                />

                                                <FastField
                                                    name="password"
                                                    component={InputField}
                                                    label="Mật khẩu"
                                                    type="password"
                                                    autoComplete="password"
                                                />
                                                <FastField
                                                    name="rePassword"
                                                    component={InputField}
                                                    label="Nhập lại mật khẩu"
                                                    type="password"
                                                    autoComplete="re-password"
                                                />
                                                <FastField
                                                    name="confirmTerm"
                                                    component={CheckBoxField}
                                                    label="Chấp nhận điều khoản"
                                                    color="primary"
                                                />
                                                <LoadingButton
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    loading={user.isLoading}
                                                    loadingPosition="end"
                                                    endIcon={<LogoutIcon />}
                                                >
                                                    Đăng kí
                                                </LoadingButton>

                                                <Grid container>
                                                    <Grid item xs>
                                                        <Link to="/forgot">
                                                            <Button
                                                                sx={{
                                                                    textTransform:
                                                                        'none'
                                                                }}
                                                            >
                                                                Quên mật khẩu?
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item>
                                                        <Link to="/login">
                                                            <Button
                                                                sx={{
                                                                    textTransform:
                                                                        'none'
                                                                }}
                                                            >
                                                                {
                                                                    'Đã có tài khoản? Đăng nhập ngay'
                                                                }
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Container>
                        </ThemeProvider>
                    </AppContainer>
                );
            }}
        </Formik>
    );
}

export default Register;
