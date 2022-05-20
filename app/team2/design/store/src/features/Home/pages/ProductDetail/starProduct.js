import React from 'react';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './body.module.scss';
import normalizeNumber from '../../../../logic/normalizeNumber';

const LinkItem = (props) => {
    const { link, content, style } = props;

    return (
        <Link to={link}>
            <div className={classes.infoContainer} style={style}>
                {content}
            </div>
        </Link>
    );
};

function StarProduct({ comments }) {
    if (!comments) return null;
    const star =
        comments.reduce((storeValue, current) => current.star + storeValue, 0) /
        comments.length;
    return (
        <>
            {comments.length > 0 ? (
                <>
                    <LinkItem link="/" content={`${normalizeNumber(star)}`} />
                    <Rating
                        name="rating"
                        size="small"
                        readOnly
                        value={star}
                        precision={1}
                    />
                </>
            ) : (
                <Rating
                    name="rating"
                    size="small"
                    readOnly
                    value={0}
                    precision={1}
                />
            )}
        </>
    );
}

export default StarProduct;
