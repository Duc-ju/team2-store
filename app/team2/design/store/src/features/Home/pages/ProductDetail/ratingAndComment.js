import React from 'react';
import classes from './ratingAndComment.module.scss';
import { Avatar, Button, Grid, Rating } from '@mui/material';

function RatingAndComment(props) {
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.starContainer}>
                    <span>4.9 trên 5</span>
                    <Rating
                        name="rating"
                        size="small"
                        readOnly
                        defaultValue={3}
                        precision={1}
                    />
                </div>
                <div className={classes.starListButton}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                Tất cả
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                5 sao
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                4 sao
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                3 sao
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                2 sao
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid var(--text-primary)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                1 sao
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.listRating}>
                <ul>
                    <li>
                        <div className={classes.avatar}>
                            <Avatar
                                sx={{ bgcolor: 'success' }}
                                alt={''}
                                src={''}
                                style={{
                                    border: '2px solid var(--bg-primary)'
                                }}
                            />
                        </div>
                        <div className={classes.ratingContainer}>
                            <span className={classes.username}>duc56</span>
                            <span className={classes.createdAt}>31/2/2022</span>
                            <span className={classes.ratingStar}>
                                <Rating
                                    name="rating"
                                    size="small"
                                    readOnly
                                    defaultValue={3}
                                    precision={1}
                                />
                            </span>
                            <span className={classes.comment}>
                                Sản phẩm tốt. Tôi dùng 1 ngày sản phẩm bị xước.
                                12h sau sản phẩm bị nứt và đúng 24h sau đó nó
                                không sử đụng được nữa. Sản phẩm tốt. Tôi dùng 1
                                ngày sản phẩm bị xước. 12h sau sản phẩm bị nứt
                                và đúng 24h sau đó nó không sử đụng được nữa
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className={classes.avatar}>
                            <Avatar
                                sx={{ bgcolor: 'success' }}
                                alt={''}
                                src={''}
                                style={{
                                    border: '2px solid var(--bg-primary)'
                                }}
                            />
                        </div>
                        <div className={classes.ratingContainer}>
                            <span className={classes.username}>duc56</span>
                            <span className={classes.createdAt}>31/2/2022</span>
                            <span className={classes.ratingStar}>
                                <Rating
                                    name="rating"
                                    size="small"
                                    readOnly
                                    defaultValue={3}
                                    precision={1}
                                />
                            </span>
                            <span className={classes.comment}>
                                Sản phẩm tốt. Tôi dùng 1 ngày sản phẩm bị xước.
                                12h sau sản phẩm bị nứt và đúng 24h sau đó nó
                                không sử đụng được nữa. Sản phẩm tốt. Tôi dùng 1
                                ngày sản phẩm bị xước. 12h sau sản phẩm bị nứt
                                và đúng 24h sau đó nó không sử đụng được nữa
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RatingAndComment;
