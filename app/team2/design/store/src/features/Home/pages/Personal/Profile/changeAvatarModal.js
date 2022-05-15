import React, { useEffect, useState } from 'react';
import classes from './changeAvatarModal.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { FastField, Form } from 'formik';
import InputField from '../../../../../components/InputField';
import SelectField from '../../../../../components/SelectField';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from '@mui/material';

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

function ChangeAvatarModal(props) {
    const { openAvatarModal, handleCloseAvatarModal } = props;
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setSelectedFile();
        setPreview();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAvatarModal}
            onClose={handleCloseAvatarModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={openAvatarModal}>
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
                        Thay đổi ảnh đại diện
                    </Typography>
                    <div className={classes.form}>
                        <input
                            type={'file'}
                            className={classes.inputFile}
                            id={'input-file'}
                            onChange={handleSelectFile}
                        />
                        {!preview && (
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    document
                                        .getElementById('input-file')
                                        .click();
                                }}
                                sx={{ my: '16px' }}
                            >
                                Chọn file
                            </Button>
                        )}
                        {preview && (
                            <>
                                <span className={classes.selectedImage}>
                                    <img src={preview} />
                                    <p className={classes.selectedInfo}>
                                        <span>File bạn đã tải lên</span>
                                        <Button
                                            variant="outlined"
                                            onClick={handleRemoveFile}
                                        >
                                            Huỷ ảnh này
                                        </Button>
                                    </p>
                                </span>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={false}
                                    loadingPosition="end"
                                    endIcon={<LockResetIcon />}
                                >
                                    Đổi ảnh
                                </LoadingButton>
                            </>
                        )}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ChangeAvatarModal;
