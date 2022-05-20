import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../../../../components/InputField';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SelectField from '../../../../../components/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../../redux/selectors';
import userApi from '../../../../../api/userApi';
import userSlice from '../../../../../redux/userSlice';
import noticeSlice from '../../../../../redux/noticeSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function ChangeInfoModal(props) {
    const { openInfoModal, handleCloseInfoModal } = props;
    const [fetching, setFetching] = useState(false);
    const [close, setClose] = useState(false);
    const user = useSelector(userSelector).current;
    const dispatch = useDispatch();
    const initialValues = {
        displayName: user.displayName || '',
        email: user.email || '',
        gender:
            ((user.gender === 'male' || user.gender === 'female') &&
                user.gender) ||
            'male'
    };
    const validationSchema = Yup.object().shape({
        displayName: Yup.string().required('Vui lòng nhập tên hiển thị'),
        email: Yup.string()
            .email('Email sai định dạng')
            .required('Vui lòng nhập email')
    });

    const handleSubmit = (data) => {
        console.log(data);
        setFetching(true);
        userApi
            .updateProfile(user.id, data)
            .then((newUser) => {
                setFetching(false);
                setClose(true);
                dispatch(userSlice.actions.loginSuccess(newUser));
                dispatch(
                    noticeSlice.actions.show({
                        type: 'success',
                        title: 'Cập nhật thông tin thành công'
                    })
                );
                handleCloseInfoModal();
            })
            .catch((e) => {
                console.log(e);
                setFetching(false);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Cập nhật không thành công'
                    })
                );
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => {
                return (
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openInfoModal}
                        onClose={handleCloseInfoModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500
                        }}
                    >
                        <Fade in={openInfoModal}>
                            <Box sx={style}>
                                <Avatar
                                    sx={{
                                        m: 1,
                                        bgcolor: 'secondary.main',
                                        margin: 'auto'
                                    }}
                                >
                                    <AccountCircleIcon />
                                </Avatar>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    sx={{
                                        margin: '6px auto',
                                        width: 'fit-content'
                                    }}
                                >
                                    Thay đổi thông tin cá nhân
                                </Typography>
                                <Form>
                                    <FastField
                                        name="displayName"
                                        component={InputField}
                                        label="Tên hiển thị"
                                        autoComplete="displayName"
                                    />

                                    <FastField
                                        name="email"
                                        component={InputField}
                                        label="Email"
                                        type="email"
                                        autoComplete="email"
                                    />

                                    <FastField
                                        name="gender"
                                        component={SelectField}
                                        label="Giới tính"
                                        autoComplete="gender"
                                        menuItems={[
                                            {
                                                value: 'male',
                                                label: 'Nam'
                                            },
                                            {
                                                value: 'female',
                                                label: 'Nữ'
                                            }
                                        ]}
                                    />

                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        loading={fetching}
                                        loadingPosition="end"
                                        endIcon={<AccountCircleIcon />}
                                    >
                                        Cập nhật
                                    </LoadingButton>
                                </Form>
                            </Box>
                        </Fade>
                    </Modal>
                );
            }}
        </Formik>
    );
}
