import React, { useEffect, useState } from 'react';
import classes from './ratingModal.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Rating, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../../../redux/selectors';
import { addDocument } from '../../../../../../firebase/services';
import noticeSlice from '../../../../../../redux/noticeSlice';
import { LoadingButton } from '@mui/lab';

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

const RatingModal = ({ openRatingModal, handleCloseRatingModal, orderId }) => {
    console.log(openRatingModal);
    const productReview = openRatingModal.productReview;
    const user = useSelector(userSelector).current;
    const [star, setStar] = useState(5);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [adding, setAdding] = useState(false);
    if (!productReview) return null;
    const handleAddComment = () => {
        setAdding(true);
        addDocument(`rating`, {
            pid: `${productReview.type}-${productReview.id}`,
            oid: orderId,
            uid: user.id,
            star,
            comment,
            photoURL: user.avatar
        })
            .then((comment) => {
                handleCloseRatingModal();
                dispatch(
                    noticeSlice.actions.show({
                        type: 'success',
                        title: 'Thêm đánh giá thành công'
                    })
                );
                setAdding(false);
            })
            .catch((e) => {
                console.log(e);
                setAdding(false);
                dispatch(
                    noticeSlice.actions.show({
                        type: 'error',
                        title: 'Thêm đánh giá thất bại'
                    })
                );
            });
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openRatingModal.status}
            onClose={handleCloseRatingModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={openRatingModal.status}>
                <Box sx={style}>
                    {!productReview.comment ? (
                        <div className={classes.root}>
                            <div className={classes.item}>
                                <img
                                    className={classes.itemImage}
                                    src={
                                        (productReview.images &&
                                            productReview.images.length > 0 &&
                                            process.env.REACT_APP_API_URL +
                                                productReview.images[0].img) ||
                                        process.env.PUBLIC_URL +
                                            '/images/box.png'
                                    }
                                />
                                <p className={classes.itemName}>
                                    {productReview.title}
                                </p>
                            </div>
                            <div className={classes.title}>
                                <h2>Viết đánh giá</h2>
                            </div>
                            <div className={classes.rating}>
                                <div className={classes.star}>
                                    <Rating
                                        name="simple-controlled"
                                        value={star}
                                        onChange={(event, newValue) => {
                                            setStar(newValue);
                                        }}
                                    />
                                    <span
                                        className={classes.starCount}
                                    >{`${star} sao`}</span>
                                </div>
                                <div className={classes.comment}>
                                    <TextField
                                        id={`comment-${productReview.type}-${productReview.id}`}
                                        label="Nhận xét của bạn"
                                        multiline
                                        rows={2}
                                        value={comment}
                                        fullWidth
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.button}>
                                <LoadingButton
                                    variant="contained"
                                    fullWidth
                                    onClick={handleAddComment}
                                    loading={adding}
                                    loadingPosition="start"
                                >
                                    Đánh giá
                                </LoadingButton>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.root}>
                            <div className={classes.item}>
                                <img
                                    className={classes.itemImage}
                                    src={
                                        (productReview.images &&
                                            productReview.images.length > 0 &&
                                            process.env.REACT_APP_API_URL +
                                                productReview.images[0].img) ||
                                        process.env.PUBLIC_URL +
                                            '/images/box.png'
                                    }
                                />
                                <p className={classes.itemName}>
                                    {productReview.title}
                                </p>
                            </div>
                            <div className={classes.title}>
                                <h2>Đánh giá của bạn</h2>
                            </div>
                            <div className={classes.rating}>
                                <div className={classes.star}>
                                    <Rating
                                        name="simple-controlled"
                                        value={productReview.comment.star}
                                        readOnly
                                    />
                                    <span
                                        className={classes.starCount}
                                    >{`${productReview.comment.star} sao`}</span>
                                </div>
                                <div className={classes.comment}>
                                    <div>{productReview.comment.comment}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
};

export default RatingModal;
