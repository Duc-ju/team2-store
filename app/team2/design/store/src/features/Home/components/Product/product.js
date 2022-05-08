import React from 'react';
import classes from './product.module.scss';
import PropTypes from 'prop-types';
import { Container } from '../Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    Badge,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Product(props) {
    const { showControl = true } = props;
    return (
        <Badge
            badgeContent={<TrendingDownIcon />}
            color="primary"
            className="hover-effect"
        >
            <Container className="shadow-clear">
                <Card>
                    <Link to="/book/1">
                        <CardMedia
                            component="img"
                            image="https://cf.shopee.vn/file/d3de9ac75596a32971882992bfd036ef"
                            alt="green iguana"
                        />
                        <CardContent sx={{ p: 1 }}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{ textAlign: 'justify', fontSize: 12 }}
                            >
                                Bộ Quần Áo Thể Thao Nam Nhiều Màu Có Cổ Thời ...
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    textAlign: 'justify',
                                    fontSize: 12,
                                    color: 'primary.main',
                                    p: 0,
                                    m: 0
                                }}
                            >
                                300.000đ
                            </Typography>
                        </CardContent>
                    </Link>
                    {showControl && (
                        <CardActions sx={{ pt: 0 }}>
                            <div className={classes.containerRow}>
                                <div className={classes.containerFlex}>
                                    <IconButton aria-label="love" size="small">
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                    {/* <IconButton aria-label='loved' size='small' color='error'>
                  <FavoriteIcon />
                </IconButton> */}
                                </div>
                                <div className={classes.containerFlex}>
                                    <Rating
                                        name="rating"
                                        size="small"
                                        readOnly
                                        defaultValue={3}
                                        precision={1}
                                        // onChange={(event, newValue) => {
                                        //   setValue(newValue);
                                        // }}
                                    />
                                </div>
                            </div>
                        </CardActions>
                    )}
                </Card>
            </Container>
        </Badge>
    );
}

Product.propTypes = {};

export default Product;
