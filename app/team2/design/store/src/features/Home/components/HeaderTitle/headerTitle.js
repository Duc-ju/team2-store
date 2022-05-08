import React from 'react';
import PropTypes from 'prop-types';
import classes from './headerTitle.module.scss';

function HeaderTitle(props) {
    const { Icon, title, style, color } = props;
    return (
        <div className={classes.headerContainer} style={style}>
            {Icon !== undefined && <Icon color={color} />}
            <p className={classes.title}>{title}</p>
        </div>
    );
}

HeaderTitle.propTypes = {
    Icon: PropTypes.any,
    title: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string
};

export default HeaderTitle;
