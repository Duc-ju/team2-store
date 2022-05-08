import React from 'react';
import PropTypes from 'prop-types';
import { FullHeightContainer } from '../Container';
import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';

function Shortcut(props) {
    const { Icon, title, link, className } = props;
    return (
        <Link to={link}>
            <FullHeightContainer
                className={`${className} shadow-bold hover-effect`}
                style={{ width: '100%' }}
            >
                <Icon sx={{ fontSize: 64, color: 'white' }} />
                <Divider light />
                <Typography
                    sx={{
                        fontWeight: 600,
                        color: 'white',
                        px: 2,
                        textAlign: 'center'
                    }}
                >
                    {title}
                </Typography>
            </FullHeightContainer>
        </Link>
    );
}

Shortcut.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string,
    link: PropTypes.string,
    className: PropTypes.string
};

export default Shortcut;
