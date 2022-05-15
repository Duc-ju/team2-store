import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../../../../components/InputField';
import LoadingButton from '@mui/lab/LoadingButton';
import LockResetIcon from '@mui/icons-material/LockReset';
import * as Yup from 'yup';

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

export default function ChangePasswordModal(props) {
    const { openPasswordModal, handleClosePasswordModal } = props;
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    };
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .min(8, 'Mật khẩu phải dài tối thiểu 8 kí tự')
            .required('Vui lòng nhập mật khẩu cũ'),
        newPassword: Yup.string()
            .min(8, 'Mật khẩu phải dài tối thiểu 8 kí tự')
            .required('Vui lòng nhập mật khẩu mới'),
        newPasswordConfirm: Yup.string().oneOf(
            [Yup.ref('newPassword'), null],
            'Mật khẩu mới không trùng khớp'
        )
    });

    const handleSubmit = (data) => {
        console.log(data);
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
                        open={openPasswordModal}
                        onClose={handleClosePasswordModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500
                        }}
                    >
                        <Fade in={openPasswordModal}>
                            <Box sx={style}>
                                <Avatar
                                    sx={{
                                        m: 1,
                                        bgcolor: 'secondary.main',
                                        margin: 'auto'
                                    }}
                                >
                                    <LockResetIcon />
                                </Avatar>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    sx={{
                                        margin: '6px auto',
                                        width: 'fit-content'
                                    }}
                                >
                                    Thay đổi mật khẩu
                                </Typography>
                                <Form>
                                    <FastField
                                        name="oldPassword"
                                        component={InputField}
                                        label="Mật khẩu cũ"
                                        type={'password'}
                                        autoFocus
                                        autoComplete="oldPassword"
                                    />

                                    <FastField
                                        name="newPassword"
                                        component={InputField}
                                        label="Mật khẩu mới"
                                        type="password"
                                        autoComplete="newPassword"
                                    />
                                    <FastField
                                        name="newPasswordConfirm"
                                        component={InputField}
                                        label="Xác nhận mật khẩu"
                                        type="password"
                                        autoComplete="newPasswordConfirm"
                                    />

                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        loading={false}
                                        loadingPosition="end"
                                        endIcon={<LockResetIcon />}
                                    >
                                        Đổi mật khẩu
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
