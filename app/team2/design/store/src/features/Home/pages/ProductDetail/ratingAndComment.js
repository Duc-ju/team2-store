import React, { useState } from 'react';
import classes from './ratingAndComment.module.scss';
import { Avatar, Button, Grid, Rating } from '@mui/material';
import { convertDateTime } from '../../../../logic/convertDateTime';
import normalizeNumber from '../../../../logic/normalizeNumber';

function RatingAndComment(props) {
    const { comments } = props;
    const [currentViewStar, setCurrentViewStar] = useState();
    if (!comments) return null;
    const star =
        comments.reduce((storeValue, current) => current.star + storeValue, 0) /
        comments.length;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.starContainer}>
                    <span>{`${normalizeNumber(star)} sao`}</span>
                    <Rating
                        name="rating"
                        size="small"
                        readOnly
                        value={star}
                        precision={0.5}
                    />
                </div>
                <div className={classes.starListButton}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                variant={
                                    currentViewStar === undefined
                                        ? 'contained'
                                        : 'outlined'
                                }
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '0.75rem'
                                }}
                                onClick={() => setCurrentViewStar()}
                            >
                                {`Tất cả (${comments.length} đánh giá)`}
                            </Button>
                        </Grid>
                        {new Array(5).fill(null).map((item, index) => (
                            <Grid item key={index}>
                                <Button
                                    variant={
                                        currentViewStar === 5 - index
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    size="small"
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: '0.75rem'
                                    }}
                                    onClick={() =>
                                        setCurrentViewStar(5 - index)
                                    }
                                >
                                    {`${5 - index} sao`}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div className={classes.listRating}>
                <ul>
                    {comments
                        .filter(
                            (comment) =>
                                currentViewStar === undefined ||
                                comment.star === currentViewStar
                        )
                        .map((comment) => (
                            <li key={comment.id}>
                                <div className={classes.avatar}>
                                    <Avatar
                                        sx={{ bgcolor: 'success' }}
                                        alt={'Avatar'}
                                        src={comment.photoURL || ''}
                                        style={{
                                            border: '2px solid var(--bg-primary)'
                                        }}
                                    />
                                </div>
                                <div className={classes.ratingContainer}>
                                    <span className={classes.username}>
                                        {comment.username || 'Người dùng'}
                                    </span>
                                    <span className={classes.createdAt}>
                                        {convertDateTime(
                                            comment.createAt.seconds
                                        )}
                                    </span>
                                    <span className={classes.ratingStar}>
                                        <Rating
                                            name="rating"
                                            size="small"
                                            readOnly
                                            defaultValue={comment.star}
                                            precision={1}
                                        />
                                    </span>
                                    <span className={classes.comment}>
                                        {comment.comment}
                                    </span>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default RatingAndComment;
