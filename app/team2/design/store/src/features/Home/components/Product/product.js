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
import normalizeNumber from '../../../../logic/normalizeNumber';

function Product(props) {
    const { showControl = true, item = {} } = props;
    const image = (() => {
        if (item.images && item.images.length >= 1)
            return process.env.REACT_APP_API_URL + item.images[0].img;
        return process.env.PUBLIC_URL + '/images/box.png';
    })();
    return (
        <Badge
            badgeContent={item.discount > 0 && <TrendingDownIcon />}
            color="primary"
            className={`${
                item.discount <= 0 ? classes.hiddenBage : ''
            } hover-effect`}
            sx={{ width: '100%' }}
        >
            <Container className="shadow-clear" style={{ width: '100%' }}>
                <Card>
                    <Link to={`/${item.type}/${item.id}`}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="green iguana"
                        />
                        <CardContent sx={{ p: 1 }}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{ textAlign: 'justify', fontSize: 12 }}
                            >
                                {item.title}
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
                                {`${normalizeNumber(
                                    item.price * (1 - item.discount)
                                )}đ`}
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
